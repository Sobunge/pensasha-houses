package com.pensasha.backend.modules.announcement.mapper;

import com.pensasha.backend.modules.announcement.Announcement;
import com.pensasha.backend.modules.announcement.dto.AnnouncementDTO;
import com.pensasha.backend.modules.user.User;

public class AnnouncementMapper {

    /**
     * Convert Announcement entity to AnnouncementDTO
     */
    public static AnnouncementDTO toDTO(Announcement announcement) {
        Long userId = announcement.getUser() != null ? announcement.getUser().getId() : null;
        return new AnnouncementDTO(
                announcement.getId(),
                userId,
                announcement.getTitle(),
                announcement.getMessage(),
                announcement.getCreatedAt(),
                announcement.getExpiresAt()
        );
    }

    /**
     * Convert AnnouncementDTO to Announcement entity for creation
     * @param dto DTO containing announcement details
     * @param user User entity (null for global announcement)
     */
    public static Announcement toEntity(AnnouncementDTO dto, User user) {
        if (user != null) {
            return new Announcement(user, dto.getTitle(), dto.getMessage(), dto.getExpiresAt());
        } else {
            return new Announcement(dto.getTitle(), dto.getMessage(), dto.getExpiresAt());
        }
    }

    /**
     * Update an existing Announcement entity from DTO
     */
    public static void updateEntity(Announcement announcement, AnnouncementDTO dto) {
        announcement.setTitle(dto.getTitle());
        announcement.setMessage(dto.getMessage());
        announcement.setExpiresAt(dto.getExpiresAt());
        // Note: user and createdAt are usually not updated
    }
}
