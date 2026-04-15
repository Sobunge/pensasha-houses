package com.pensasha.backend.modules.user;

public record PasswordResetTokenStatus(
        TokenStatus status,
        String message,
        String userPublicId
) {}