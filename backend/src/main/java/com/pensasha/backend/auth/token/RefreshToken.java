package com.pensasha.backend.auth.token;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import com.pensasha.backend.modules.user.User;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private LocalDateTime expiryDate;

    public RefreshToken(String token, User user) {
        this.token = token;
        this.user = user;
        this.expiryDate =
                LocalDateTime.now(ZoneOffset.UTC).plusDays(7);
    }

    public boolean isExpired() {
        return expiryDate.isBefore(LocalDateTime.now(ZoneOffset.UTC));
    }
}