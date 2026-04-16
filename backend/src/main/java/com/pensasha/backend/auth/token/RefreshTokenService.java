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

    private static final long REFRESH_TOKEN_EXPIRY_DAYS = 7;

    /* ========================= CREATE SESSION ========================= */
    @Transactional
    public String create(User user) {

        String tokenValue = UUID.randomUUID().toString();

        RefreshToken token = new RefreshToken();
        token.setToken(tokenValue);
        token.setUser(user);
        token.setExpiryDate(
                LocalDateTime.now(ZoneOffset.UTC)
                        .plusDays(REFRESH_TOKEN_EXPIRY_DAYS));

        refreshTokenRepository.save(token);

        return tokenValue;
    }

    /* ========================= FIND BY TOKEN ========================= */
    @Transactional(readOnly = true)
    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Invalid refresh token"));
    }

    /* ========================= DELETE SINGLE SESSION ========================= */
    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    /*
     * ========================= DELETE ALL USER SESSIONS =========================
     */
    @Transactional
    public void deleteAllByUser(User user) {
        refreshTokenRepository.deleteAllByUser(user);
    }

    /* ========================= VALIDATION ========================= */
    public boolean isExpired(RefreshToken token) {
        return token.getExpiryDate()
                .isBefore(LocalDateTime.now(ZoneOffset.UTC));
    }
}