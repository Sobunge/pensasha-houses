package com.pensasha.backend.modules.announcement;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.announcement.dto.AnnouncementDTO;
import com.pensasha.backend.modules.user.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    /**
     * CREATE a new announcement
     * @param userId optional: user-specific announcement; omit for global
     */
    @PostMapping
    public ResponseEntity<AnnouncementDTO> createAnnouncement(
            @RequestParam(required = false) Long userId,
            @Valid @RequestBody AnnouncementDTO dto) {

        User user = null;
        if (userId != null) {
            user = new User();
            user.setId(userId); // minimal user object for mapping
        }

        AnnouncementDTO response = announcementService.createAnnouncement(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET a single announcement by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> getAnnouncement(@PathVariable Long id) {
        AnnouncementDTO dto = announcementService.getAnnouncement(id);
        return ResponseEntity.ok(dto);
    }

    /**
     * UPDATE an existing announcement
     */
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> updateAnnouncement(
            @PathVariable Long id,
            @Valid @RequestBody AnnouncementDTO dto) {

        AnnouncementDTO updated = announcementService.updateAnnouncement(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE an announcement
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET all announcements for a user (includes global)
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AnnouncementDTO>> getAnnouncementsForUser(@PathVariable Long userId) {
        List<AnnouncementDTO> announcements = announcementService.getAnnouncementsByUserId(userId);
        return ResponseEntity.ok(announcements);
    }

}
