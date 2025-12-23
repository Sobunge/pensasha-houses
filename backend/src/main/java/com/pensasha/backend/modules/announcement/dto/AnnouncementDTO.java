package com.pensasha.backend.modules.announcement.dto;

import java.time.LocalDateTime;

public class AnnouncementDTO {

    private Long id;
    private Long userId; // null for global announcements
    private String title;
    private String message;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    // No-args constructor
    public AnnouncementDTO() {
    }

    // All-args constructor
    public AnnouncementDTO(Long id, Long userId, String title, String message,
            LocalDateTime createdAt, LocalDateTime expiresAt) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public static AnnouncementDTO fromEntity(com.pensasha.backend.modules.announcement.Announcement announcement) {
        Long userId = announcement.getUser() != null ? announcement.getUser().getId() : null;
        return new AnnouncementDTO(
                announcement.getId(),
                userId,
                announcement.getTitle(),
                announcement.getMessage(),
                announcement.getCreatedAt(),
                announcement.getExpiresAt());
    }
}
