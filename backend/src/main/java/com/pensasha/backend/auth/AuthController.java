package com.pensasha.backend.auth;

import com.pensasha.backend.modules.user.ForgotPasswordRequest;
import com.pensasha.backend.modules.user.ResetPasswordRequest;
import com.pensasha.backend.modules.user.dto.*;
import com.pensasha.backend.security.PasswordResetService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;

    /* ========================= REGISTER ========================= */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @Valid @RequestBody CreateUserDTO dto,
            HttpServletResponse response) {

        return ResponseEntity.ok(authService.register(dto, response));
    }

    /* ========================= LOGIN ========================= */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @Valid @RequestBody LoginRequestDTO dto,
            HttpServletResponse response) {

        return ResponseEntity.ok(authService.login(dto, response));
    }

    /* ========================= REFRESH TOKEN ========================= */
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(
            HttpServletRequest request,
            HttpServletResponse response) {

        return ResponseEntity.ok(authService.refresh(request, response));
    }

    /* ========================= LOGOUT (single session) ========================= */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(
            HttpServletRequest request,
            HttpServletResponse response) {

        authService.logout(request, response);

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    /* ========================= FORGOT PASSWORD ========================= */
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        passwordResetService.requestReset(request.getPhoneNumber());

        return ResponseEntity.ok("If account exists, reset link has been sent");
    }

    /* ========================= RESET PASSWORD ========================= */
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        passwordResetService.resetPassword(
                request.getToken(),
                request.getNewPassword());

        return ResponseEntity.ok("Password updated successfully");
    }

    /* ========================= VERIFY RESET TOKEN ========================= */
    @GetMapping("/verify-reset-token")
    public ResponseEntity<String> verifyToken(@RequestParam String token) {

        passwordResetService.verifyToken(token);

        return ResponseEntity.ok("Token valid");
    }
}