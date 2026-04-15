package com.pensasha.backend.auth.token;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.modules.user.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(User user);

    void deleteByUser(User user);
}
