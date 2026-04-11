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
import org.springframework.beans.factory.annotation.Value;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.dto.*;
import com.pensasha.backend.security.CustomUserDetailsService;
import com.pensasha.backend.security.JWTUtils;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60; // seconds

    /* ========================= REGISTER ========================= */
    /* ========================= REGISTER ========================= */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody CreateUserDTO dto,
            BindingResult result,
            HttpServletResponse response) {

        // 1. Handle Validation Errors
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(e -> e.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        try {
            // 2. Create the User
            // (The redundancy is removed; the Service handles the existence check)
            GetUserDTO created = userService.createUser(dto);

            // 3. Auto-Login: Generate tokens for the new user
            CustomUserDetails userDetails = (CustomUserDetails) userDetailsService
                    .loadUserByUsername(dto.getPhoneNumber());
            Map<String, String> tokens = jwtUtils.generateTokens(userDetails);

            // 4. Set Refresh Token in HttpOnly Cookie
            setRefreshTokenCookie(response, tokens.get("refreshToken"));

            // 5. Return everything the frontend needs to start the session
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "accessToken", tokens.get("accessToken"),
                    "user", created,
                    "principal", buildAuthPrincipal(userDetails)));

        } catch (IllegalArgumentException e) {
            // Catches the "User already exists" or "Invalid role" from the Service
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred during registration"));
        }
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
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            String phoneNumber = jwtUtils.extractUsername(refreshToken);

            // This is the line that was throwing the unhandled UsernameNotFoundException
            CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(phoneNumber);

            if (!jwtUtils.validateRefreshToken(refreshToken, userDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String newAccessToken = jwtUtils.generateTokens(userDetails).get("accessToken");
            return ResponseEntity.ok(new LoginResponseDTO(newAccessToken, buildAuthPrincipal(userDetails)));

        } catch (org.springframework.security.core.userdetails.UsernameNotFoundException e) {
            // If the user isn't found, return 401 instead of crashing with a 500
            log.warn("Refresh failed: User not found for phone number extracted from token.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            // Catch-all for other JWT parsing issues
            log.error("Refresh failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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

        // 1. Check if user exists AND has an email address
        if (user != null && user.getEmail() != null && !user.getEmail().isBlank()) {

            // 2. DELETE existing tokens for this user so only the NEWEST link works
            tokenRepository.deleteByUser(user);

            // 3. Create the new token
            String token = UUID.randomUUID().toString();
            tokenRepository.save(new PasswordResetToken(token, user));

            String resetLink = frontendUrl + "/reset-password/" + token;

            // This is where the crash was happening because user.getEmail() was null
            emailService.sendResetEmail(user.getEmail(), resetLink);
        }

        // Always return OK to prevent "User Enumeration" (security best practice)
        return ResponseEntity.ok("If an account is associated with this number, a reset link has been sent.");
    }

    /* ========================= RESET PASSWORD ========================= */

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            // We delegate all logic (finding token, expiry check, and deletion) to the
            // service
            userService.resetPassword(request.getToken(), request.getNewPassword());

            return ResponseEntity.ok("Password successfully updated. You can now log in.");

        } catch (ResourceNotFoundException e) {
            // Triggered if the token doesn't exist in the DB
            return ResponseEntity.badRequest().body("Invalid or missing reset token.");

        } catch (IllegalStateException e) {
            // Triggered if the token is found but expired
            return ResponseEntity.badRequest().body(e.getMessage());

        } catch (Exception e) {
            // Catch-all for unexpected database or server issues
            log.error("Password reset error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating your password.");
        }
    }

    /* ========================= Verify Reset Token ========================= */
    @GetMapping("/verify-reset-token")
    public ResponseEntity<?> verifyToken(@RequestParam("token") String token) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);

        if (tokenOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token not found");
        }

        PasswordResetToken resetToken = tokenOpt.get();

        // Check expiry
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now(java.time.ZoneOffset.UTC))) {
            tokenRepository.delete(resetToken); // Cleanup
            return ResponseEntity.status(HttpStatus.GONE).body("Token has expired");
        }

        return ResponseEntity.ok("Token is valid");
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
                user.getFirstName(),
                roles,
                permissions,
                "/dashboard");
    }
}