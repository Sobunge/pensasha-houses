package com.pensasha.backend.modules.announcement;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pensasha.backend.modules.announcement.dto.AnnouncementDTO;
import com.pensasha.backend.modules.announcement.mapper.AnnouncementMapper;
import com.pensasha.backend.modules.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    /**
     * Create a new announcement
     */
    public AnnouncementDTO createAnnouncement(AnnouncementDTO dto, User user) {

        Announcement announcement = Objects.requireNonNull(
                AnnouncementMapper.toEntity(dto, user),
                "Announcement entity cannot be null");

        Announcement saved = Objects.requireNonNull(
                announcementRepository.save(announcement),
                "Saved announcement cannot be null");

        return AnnouncementMapper.toDTO(saved);
    }

    /**
     * Update an existing announcement
     */
    public AnnouncementDTO updateAnnouncement(long id, AnnouncementDTO dto) {

        Announcement existing = announcementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Announcement not found with id: " + id));

        AnnouncementMapper.updateEntity(existing, dto);

        Announcement updated = announcementRepository.save(existing);

        return AnnouncementMapper.toDTO(updated);
    }

    /**
     * Get announcement by ID
     */
    @Transactional(readOnly = true)
    public AnnouncementDTO getAnnouncement(Long id) {

        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));

        return AnnouncementMapper.toDTO(announcement);
    }

    /**
     * Get all announcements for a user
     */
    @Transactional(readOnly = true)
    public List<AnnouncementDTO> getAnnouncementsByUserId(Long userId) {

        List<Announcement> announcements = announcementRepository.findByUserId(userId);

        return announcements.stream()
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