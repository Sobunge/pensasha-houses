package com.pensasha.backend.auth.userCredentials;

import java.time.LocalDateTime;

import com.pensasha.backend.modules.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_credentials")
@Getter
@Setter
public class UserCredentials {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String password;

    // Removed inline initializers here (= true / = false)
    private boolean enabled;
    private boolean locked;

    private LocalDateTime accountExpirationDate;
    private LocalDateTime passwordExpirationDate;

    // No-args constructor setting your default values
    public UserCredentials() {
        this.enabled = true;
        this.locked = false;
    }

    // All-args constructor
    public UserCredentials(Long id, User user, String password, boolean enabled, boolean locked, 
                           LocalDateTime accountExpirationDate, LocalDateTime passwordExpirationDate) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.enabled = enabled;
        this.locked = locked;
        this.accountExpirationDate = accountExpirationDate;
        this.passwordExpirationDate = passwordExpirationDate;
    }
}