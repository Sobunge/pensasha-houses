package com.pensasha.backend.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.modules.user.User;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    List<RefreshToken> findAllByUser(User user);

    void deleteByToken(String token);

    void deleteAllByUser(User user);
}