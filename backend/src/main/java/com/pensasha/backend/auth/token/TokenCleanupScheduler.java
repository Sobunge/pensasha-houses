package com.pensasha.backend.auth.token;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;

@Slf4j
@Component
public class TokenCleanupScheduler {

    private final RefreshTokenRepository refreshTokenRepository;

    TokenCleanupScheduler(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    // Runs every night at midnight (00:00:00)
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void purgeExpiredTokens() {
        log.info("Starting automatic cleanup of expired refresh tokens...");
        refreshTokenRepository.deleteByExpiryDateBefore(Instant.now());
        log.info("Expired refresh tokens successfully purged.");
    }
}