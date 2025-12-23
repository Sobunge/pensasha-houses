package com.pensasha.backend.modules.announcement;

import java.time.LocalDateTime;

import com.pensasha.backend.modules.user.User;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(nullable = false, length = 2000)
    private String message;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime expiresAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Constructor for user-specific announcement
    public Announcement(User user, String title, String message, LocalDateTime expiresAt) {
        this.user = user;
        this.title = title;
        this.message = message;
        this.expiresAt = expiresAt;
    }

    // Constructor for global announcement
    public Announcement(String title, String message, LocalDateTime expiresAt) {
        this(null, title, message, expiresAt);
    }
}
