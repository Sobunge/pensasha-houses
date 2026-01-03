package com.pensasha.backend.modules.announcement;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.announcement.dto.AnnouncementDTO;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;
    private final UserService userService;

    /**
     * CREATE a new announcement
     * Global announcement if userId is null
     */
    @PostMapping
    public ResponseEntity<AnnouncementDTO> createAnnouncement(
            @RequestParam(required = false) Long userId,
            @Valid @RequestBody AnnouncementDTO dto) {

        AnnouncementDTO response =
                announcementService.createAnnouncement(dto, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> getAnnouncement(@PathVariable Long id) {
        return ResponseEntity.ok(announcementService.getAnnouncement(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> updateAnnouncement(
            @PathVariable Long id,
            @Valid @RequestBody AnnouncementDTO dto) {

        return ResponseEntity.ok(
                announcementService.updateAnnouncement(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AnnouncementDTO>> getAnnouncementsForUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                announcementService.getAnnouncementsByUserId(userId)
        );
    }
}
