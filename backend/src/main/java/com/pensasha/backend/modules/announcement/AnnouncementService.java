package com.pensasha.backend.modules.announcement;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pensasha.backend.modules.announcement.dto.AnnouncementDTO;
import com.pensasha.backend.modules.announcement.mapper.AnnouncementMapper;
import com.pensasha.backend.modules.user.User;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    /**
     * Create a new announcement
     * @param dto DTO containing announcement details
     * @param user User entity (null for global announcement)
     * @return AnnouncementDTO
     */
    public AnnouncementDTO createAnnouncement(AnnouncementDTO dto, User user) {
        Announcement announcement = AnnouncementMapper.toEntity(dto, user);
        Announcement saved = announcementRepository.save(announcement);
        return AnnouncementMapper.toDTO(saved);
    }

    /**
     * Update an existing announcement
     * @param id Announcement ID
     * @param dto DTO with updated fields
     * @return AnnouncementDTO
     */
    public AnnouncementDTO updateAnnouncement(Long id, AnnouncementDTO dto) {
        Announcement existing = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));

        AnnouncementMapper.updateEntity(existing, dto);
        Announcement updated = announcementRepository.save(existing);
        return AnnouncementMapper.toDTO(updated);
    }

    /**
     * Get announcement by ID
     */
    public AnnouncementDTO getAnnouncement(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        return AnnouncementMapper.toDTO(announcement);
    }

    /**
     * Get all announcements for a user (including global announcements)
     */
    public List<AnnouncementDTO> getAnnouncementsByUserId(Long userId) {
        List<Announcement> announcements = announcementRepository.findByUserId(userId);

        return announcements.stream()
                .collect(Collectors.toList())
                .stream()
                .map(AnnouncementMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Delete an announcement
     */
    public void deleteAnnouncement(Long id) {
        Announcement existing = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        announcementRepository.delete(existing);
    }
}
