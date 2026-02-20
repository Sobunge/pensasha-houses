package com.pensasha.backend.modules.announcement;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.announcement.dto.AnnouncementDTO;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * REST controller responsible for managing announcements.
 *
 * Announcements can be:
 * - Global (not tied to any user)
 * - User-specific (tied to a particular user)
 *
 * This controller delegates all business logic to the service layer
 * and focuses strictly on HTTP request/response handling.
 */
@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    /**
     * Service responsible for announcement business logic
     * (creation, retrieval, update, deletion).
     */
    private final AnnouncementService announcementService;

    /**
     * Service used to resolve User entities.
     * Allows announcements to be optionally associated with a user.
     */
    private final UserService userService;

    /**
     * CREATE a new announcement.
     *
     * Behavior:
     * - If userId is provided, the announcement is linked to that user.
     * - If userId is null, the announcement is treated as global.
     *
     * Validation:
     * - AnnouncementDTO is validated using Jakarta Bean Validation.
     *
     * @param userId optional ID of the user the announcement belongs to
     * @param dto    announcement data payload
     * @return created AnnouncementDTO with HTTP 201 status
     */
    @PostMapping
    public ResponseEntity<AnnouncementDTO> createAnnouncement(
            @RequestParam(required = false) Long userId,
            @Valid @RequestBody AnnouncementDTO dto) {

        User user = null;

        // If userId is provided, verify the user exists
        if (userId != null) {
            if (!userService.userExistsById(userId)) {
                throw new ResourceNotFoundException(
                        "User not found with id: " + userId);
            }

            // Create a lightweight reference without hitting the database again
            user = userService.getUserEntityById(userId);
        }

        AnnouncementDTO response = announcementService.createAnnouncement(dto, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET a single announcement by its ID.
     *
     * @param id announcement ID
     * @return AnnouncementDTO if found
     */
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> getAnnouncement(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                announcementService.getAnnouncement(id));
    }

    /**
     * UPDATE an existing announcement.
     *
     * Behavior:
     * - Updates only mutable fields defined in AnnouncementDTO.
     * - Throws an exception if the announcement does not exist.
     *
     * @param id  announcement ID
     * @param dto updated announcement data
     * @return updated AnnouncementDTO
     */
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> updateAnnouncement(
            @PathVariable Long id,
            @Valid @RequestBody AnnouncementDTO dto) {

        return ResponseEntity.ok(
                announcementService.updateAnnouncement(id, dto));
    }

    /**
     * DELETE an announcement by ID.
     *
     * Behavior:
     * - Performs a hard delete.
     * - Returns HTTP 204 (No Content) on success.
     *
     * @param id announcement ID
     * @return empty response with HTTP 204 status
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(
            @PathVariable Long id) {

        announcementService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET all announcements for a specific user.
     *
     * Behavior:
     * - Returns announcements explicitly linked to the user
     * - May also include global announcements depending on repository logic
     *
     * @param userId user ID
     * @return list of AnnouncementDTOs
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AnnouncementDTO>> getAnnouncementsForUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                announcementService.getAnnouncementsByUserId(userId));
    }
}
