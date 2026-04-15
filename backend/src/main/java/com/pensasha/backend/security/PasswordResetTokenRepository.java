package com.pensasha.backend.security;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.pensasha.backend.modules.user.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    @Modifying // REQUIRED for delete/update queries
    @Query("DELETE FROM PasswordResetToken t WHERE t.user = :user")
    void deleteByUser(User user);
}
