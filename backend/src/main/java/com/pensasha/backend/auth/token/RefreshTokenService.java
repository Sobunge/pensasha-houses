package com.pensasha.backend.auth.token;

import com.pensasha.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    // 7 days validity (same as your AuthService cookie expiry concept)
    private static final long REFRESH_TOKEN_EXPIRY_DAYS = 7;

    /* ========================= CREATE ========================= */
    @Transactional
    public String create(User user) {

        // 1. Remove existing token (1 session per user rule)
        refreshTokenRepository.deleteByUser(user);

        // 2. Generate secure random token
        String tokenValue = UUID.randomUUID().toString();

        // 3. Create entity
        RefreshToken token = new RefreshToken();
        token.setToken(tokenValue);
        token.setUser(user);
        token.setExpiryDate(
                LocalDateTime.now(ZoneOffset.UTC).plusDays(REFRESH_TOKEN_EXPIRY_DAYS)
        );

        // 4. Save to DB
        refreshTokenRepository.save(token);

        return tokenValue;
    }

    /* ========================= FIND ========================= */
    @Transactional(readOnly = true)
    public RefreshToken findByToken(String token) {

        return refreshTokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("Invalid refresh token"));
    }

    /* ========================= DELETE (by entity) ========================= */
    @Transactional
    public void delete(RefreshToken token) {
        refreshTokenRepository.delete(token);
    }

    /* ========================= DELETE (by string token) ========================= */
    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.findByToken(token)
                .ifPresent(refreshTokenRepository::delete);
    }

    /* ========================= VALIDATION ========================= */
    public boolean isExpired(RefreshToken token) {
        return token.getExpiryDate()
                .isBefore(LocalDateTime.now(ZoneOffset.UTC));
    }
}