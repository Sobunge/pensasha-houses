package com.pensasha.backend.security;

import com.pensasha.backend.auth.userCredentials.UserCredentials;
import com.pensasha.backend.auth.userCredentials.UserCredentialsRepository;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.*;
import com.pensasha.backend.modules.user.dto.ResetPasswordDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final UserCredentialsRepository credentialsRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    /**
     * Step 1: Request password reset link
     */
    @Transactional
    public void requestReset(String phoneNumber) {

        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElse(null);

        // SECURITY: always behave the same to prevent user enumeration
        if (user == null || user.getEmail() == null || user.getEmail().isBlank()) {
            log.warn("Password reset requested for non-existent or invalid user: {}", phoneNumber);
            return;
        }

        // delete old tokens (only latest is valid)
        tokenRepository.deleteByUser(user);

        String token = UUID.randomUUID().toString();
        tokenRepository.save(new PasswordResetToken(token, user));

        String resetLink = frontendUrl + "/reset-password/" + token;

        emailService.sendResetEmail(user.getEmail(), resetLink);

        log.info("Password reset link generated for user {}", user.getId());
    }

    /**
     * Step 2: Reset password using token
     */
    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid reset token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now(ZoneOffset.UTC))) {
            tokenRepository.delete(resetToken);
            throw new IllegalStateException("Reset token expired");
        }

        UserCredentials credentials = credentialsRepository.findByUser(resetToken.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("Credentials not found"));

        credentials.setPassword(newPassword); // hashing should happen in AuthService or listener

        User user = credentials.getUser();
        user.setTokenVersion(user.getTokenVersion() + 1);

        credentialsRepository.save(credentials);
        tokenRepository.delete(resetToken);

        log.info("Password reset successful for user {}", user.getId());
    }

    /* ========================= CHANGE PASSWORD ========================= */
    @Transactional
    public void changePassword(Long userId, ResetPasswordDTO dto) {

        UserCredentials credentials = credentialsRepository.findById(userId)
                .orElseThrow();

        if (!passwordEncoder.matches(dto.getCurrentPassword(), credentials.getPassword())) {
            throw new IllegalArgumentException("Invalid current password");
        }

        credentials.setPassword(passwordEncoder.encode(dto.getNewPassword()));
    }

    /* ========================= VERIFY RESET TOKEN ========================= */
    @Transactional(readOnly = true)
    public PasswordResetTokenStatus verifyToken(String token) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElse(null);

        // 1. Token does not exist → safe response (no exception leak)
        if (resetToken == null) {
            return new PasswordResetTokenStatus(
                    TokenStatus.INVALID,
                    "Invalid token",
                    null);
        }

        // 2. Expiry check
        boolean expired = resetToken.getExpiryDate()
                .isBefore(java.time.LocalDateTime.now(java.time.ZoneOffset.UTC));

        if (expired) {
            return new PasswordResetTokenStatus(
                    TokenStatus.EXPIRED,
                    "Token expired",
                    null);
        }

        // 3. Valid token
        return new PasswordResetTokenStatus(
                TokenStatus.VALID,
                "Token is valid",
                resetToken.getUser().getPublicId());
    }
}