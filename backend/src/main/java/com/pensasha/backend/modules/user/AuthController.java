package com.pensasha.backend.modules.user;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.user.dto.*;
import com.pensasha.backend.security.CustomUserDetailsService;
import com.pensasha.backend.security.JWTUtils;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UserService userService;
    private final CustomUserDetailsService userDetailsService;

    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60; // seconds

    /* ========================= REGISTER ========================= */
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody CreateUserDTO dto,
            BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(e -> e.getDefaultMessage())
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest()
                    .body(Map.of("errors", errors));
        }

        if (userService.userExists(dto.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "User with this phone number already exists"));
        }

        GetUserDTO created = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /* ========================= LOGIN ========================= */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request,
            BindingResult result,
            HttpServletResponse response) {

        if (result.hasErrors()) {
            String message = result.getFieldErrors().get(0).getDefaultMessage();
            return ResponseEntity.badRequest()
                    .body(new LoginResponseDTO(
                            null,
                            new AuthPrincipalDTO(null, null, null, message, message)));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getPhoneNumber(),
                        request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Map<String, String> tokens = jwtUtils.generateTokens(userDetails);

        setRefreshTokenCookie(response, tokens.get("refreshToken"));

        return ResponseEntity.ok(new LoginResponseDTO(
                tokens.get("accessToken"),
                buildAuthPrincipal(userDetails)));
    }

    /* ========================= REFRESH ========================= */
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(HttpServletRequest request) {
        String refreshToken = extractRefreshToken(request);
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String phoneNumber = jwtUtils.extractUsername(refreshToken);
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(phoneNumber);

        if (!jwtUtils.validateRefreshToken(refreshToken, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String newAccessToken = jwtUtils.generateTokens(userDetails).get("accessToken");
        return ResponseEntity.ok(new LoginResponseDTO(newAccessToken, buildAuthPrincipal(userDetails)));
    }

    /* ========================= LOGOUT ========================= */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/api/auth/refresh")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    /* ========================= HELPERS ========================= */
    private String extractRefreshToken(HttpServletRequest request) {
        return Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                .filter(c -> "refreshToken".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/api/auth/refresh")
                .maxAge(REFRESH_TOKEN_EXPIRATION_MS)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private AuthPrincipalDTO buildAuthPrincipal(CustomUserDetails userDetails) {
        // Use single-role constructor
        return new AuthPrincipalDTO(
                userDetails.getUser().getId(),
                null,
                userDetails.getUser().getPhoneNumber(),
                userDetails.getPrimaryRole().name().toLowerCase(),
                resolveDefaultRoute(userDetails.getPrimaryRole()));
    }

    private String resolveDefaultRoute(Role role) {
        return switch (role) {
            case TENANT -> "/tenant";
            case LANDLORD -> "/landlord";
            case CARETAKER -> "/caretaker";
            case ADMIN -> "/admin";
        };
    }
}