package com.pensasha.backend.auth;

import com.pensasha.backend.dto.ApiResponse;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.ForgotPasswordRequest;
import com.pensasha.backend.modules.user.ResetPasswordRequest;
import com.pensasha.backend.modules.user.dto.AuthResponseDTO;
import com.pensasha.backend.modules.user.dto.LoginRequestDTO;
import com.pensasha.backend.security.PasswordResetService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;

    /* ========================= REGISTER ========================= */

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody CreateUserDTO dto,
            HttpServletResponse response) {

        return ResponseEntity.ok(authService.register(dto, response));
    }

    /* ========================= LOGIN ========================= */

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO dto,
            HttpServletResponse response) {

        return ResponseEntity.ok(authService.login(dto, response));
    }

    /* ========================= REFRESH ========================= */

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(
            HttpServletRequest request,
            HttpServletResponse response) {

        return ResponseEntity.ok(authService.refresh(request, response));
    }

    /* ========================= LOGOUT ========================= */

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(
            HttpServletRequest request,
            HttpServletResponse response) {

        authService.logout(request, response);

        return ResponseEntity.ok(
                new ApiResponse("Logged out successfully.")
        );
    }

    /* ========================= FORGOT PASSWORD ========================= */

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        passwordResetService.requestReset(request.getPhoneNumber());

        return ResponseEntity.ok(
                new ApiResponse("If an account exists, a password reset link has been sent.")
        );
    }

    /* ========================= RESET PASSWORD ========================= */

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        passwordResetService.resetPassword(
                request.getToken(),
                request.getNewPassword()
        );

        return ResponseEntity.ok(
                new ApiResponse("Password updated successfully.")
        );
    }

    /* ========================= VERIFY RESET TOKEN ========================= */

    @GetMapping("/verify-reset-token")
    public ResponseEntity<ApiResponse> verifyResetToken(
            @RequestParam String token) {

        passwordResetService.verifyToken(token);

        return ResponseEntity.ok(
                new ApiResponse("Token is valid.")
        );
    }
}