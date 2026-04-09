package com.pensasha.backend.modules.user;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;
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
import org.springframework.transaction.annotation.Transactional;

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
    private final EmailService emailService;
    private final CustomUserDetailsService userDetailsService;
    private final PasswordResetTokenRepository tokenRepository;

    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60; // seconds

    /* ========================= REGISTER ========================= */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody CreateUserDTO dto, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(e -> e.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
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
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request,
            BindingResult result,
            HttpServletResponse response) {

        if (result.hasErrors()) {
            String message = result.getFieldErrors().get(0).getDefaultMessage();
            return ResponseEntity.badRequest().body(Map.of("error", message));
        }

        if (!userService.userExists(request.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Phone number not registered"));
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getPhoneNumber(),
                            request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            Map<String, String> tokens = jwtUtils.generateTokens(userDetails);

            setRefreshTokenCookie(response, tokens.get("refreshToken"));

            return ResponseEntity.ok(Map.of(
                    "accessToken", tokens.get("accessToken"),
                    "principal", buildAuthPrincipal(userDetails)));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid phone number or password"));
        }
    }

    /* ========================= REFRESH ========================= */
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(HttpServletRequest request) {
        String refreshToken = extractRefreshToken(request);
        if (refreshToken == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String phoneNumber = jwtUtils.extractUsername(refreshToken);
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(phoneNumber);

        if (!jwtUtils.validateRefreshToken(refreshToken, userDetails))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

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

    /* ========================= FORGOT PASSWORD ========================= */
    @Transactional
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        User user = userService.getUserEntityByPhoneNumber(request.getPhoneNumber());

        if (user != null) {
            // 1. DELETE existing tokens for this user so only the NEWEST link works
            tokenRepository.deleteByUser(user);

            // 2. Create the new token
            String token = UUID.randomUUID().toString();
            tokenRepository.save(new PasswordResetToken(token, user));

            String baseUrl = "https://localhost:3000";
            String resetLink = baseUrl + "/reset-password?token=" + token;

            emailService.sendResetEmail(user.getEmail(), resetLink);
        }

        return ResponseEntity.ok("If an account is associated with this number, a reset link has been sent.");
    }

    /* ========================= RESET PASSWORD ========================= */
    @Transactional // Important for delete operations
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        // 1. Find the token safely using Optional
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(request.getToken());

        if (tokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid or missing reset token.");
        }

        PasswordResetToken resetToken = tokenOpt.get();

        // 2. Check if the token has expired
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            // CLEANUP: Delete the expired token from the DB
            tokenRepository.delete(resetToken);
            return ResponseEntity.badRequest().body("This reset link has expired. Please request a new one.");
        }

        // 3. Update the user's password
        userService.resetPassword(resetToken.getUser().getPhoneNumber(), request.getNewPassword());

        // 4. CLEANUP: Delete the token so it can't be used again
        tokenRepository.delete(resetToken);

        return ResponseEntity.ok("Password successfully updated. You can now log in.");
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
        User user = userDetails.getUser();

        Set<String> roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        Set<String> permissions = user.getPermissions(); // role-based only

        return new AuthPrincipalDTO(
                user.getId(),
                user.getPublicId(),
                user.getPhoneNumber(),
                roles,
                permissions,
                "/dashboard");
    }
}