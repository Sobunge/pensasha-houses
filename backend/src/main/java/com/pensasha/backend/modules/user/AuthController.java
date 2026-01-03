package com.pensasha.backend.modules.user;

import java.util.*;

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

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UserService userService;
    private final CustomUserDetailsService customUserDetailsService;

    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000;

    // ========================= REGISTER =========================
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody CreateUserDTO dto,
            BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> err.getDefaultMessage())
                    .toList();
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        if (userService.userExists(dto.getIdNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "User already exists"));
        }

        GetUserDTO savedUser = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    // ========================= LOGIN =========================
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request,
            BindingResult result,
            HttpServletResponse response) {

        if (result.hasErrors()) {
            String message = result.getFieldErrors().get(0).getDefaultMessage();
            return ResponseEntity.badRequest()
                    .body(new LoginResponseDTO(null,
                            new AuthPrincipalDTO(null, null, null, message)));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdNumber(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Map<String, String> tokens = jwtUtils.generateTokens(userDetails);
        String accessToken = tokens.get("accessToken");
        String refreshToken = tokens.get("refreshToken");

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/api/auth/refresh")
                .maxAge(REFRESH_TOKEN_EXPIRATION_MS / 1000)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        Role role = userDetails.getPrimaryRole();
        AuthPrincipalDTO principal = new AuthPrincipalDTO(
                userDetails.getUser().getId(),
                userDetails.getUsername(),
                role.name().toLowerCase(),
                resolveDefaultRoute(role)
        );

        return ResponseEntity.ok(new LoginResponseDTO(accessToken, principal));
    }

    // ========================= REFRESH TOKEN =========================
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(HttpServletRequest request) {

        String refreshToken = Arrays.stream(Optional.ofNullable(request.getCookies())
                        .orElse(new Cookie[0]))
                .filter(c -> "refreshToken".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (refreshToken == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String username = jwtUtils.extractUsername(refreshToken);
        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(username);

        if (!jwtUtils.validateToken(refreshToken, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String newAccessToken = jwtUtils.generateTokens(userDetails).get("accessToken");
        Role role = userDetails.getPrimaryRole();
        AuthPrincipalDTO principal = new AuthPrincipalDTO(
                userDetails.getUser().getId(),
                userDetails.getUsername(),
                role.name().toLowerCase(),
                resolveDefaultRoute(role)
        );

        return ResponseEntity.ok(new LoginResponseDTO(newAccessToken, principal));
    }

    // ========================= LOGOUT =========================
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

    // ========================= HELPERS =========================
    private String resolveDefaultRoute(Role role) {
        return switch (role) {
            case TENANT -> "/tenant";
            case LANDLORD -> "/landlord";
            case CARETAKER -> "/caretaker";
            case ADMIN -> "/admin";
            default -> "/";
        };
    }
}
