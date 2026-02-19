package com.pensasha.backend.modules.user.caretaker;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserService;
import com.pensasha.backend.modules.user.caretaker.dto.CreateCaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.dto.GetCaretakerDTO;

import java.util.List;

/**
 * REST Controller for managing caretaker profiles.
 */
@Slf4j
@RestController
@RequestMapping("/api/caretakers")
@RequiredArgsConstructor
public class CaretakerController {

    private final CaretakerService caretakerService;
    private final UserService userService; // Used to fetch the User entity

    /**
     * Create a new caretaker profile linked to an existing user.
     */
    @PostMapping
    public ResponseEntity<GetCaretakerDTO> createCaretaker(
            @RequestBody CreateCaretakerDTO dto) {

        log.info("API call: Create caretaker profile for userId={}", dto.getUserId());

        // Validate and fetch the existing user
        User user = userService.getUserEntity(dto.getUserId());
        if (user == null) {
            log.error("User not found with ID {}", dto.getUserId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Create the caretaker profile linked to the user
        GetCaretakerDTO createdProfile = caretakerService.createCaretaker(dto, user);

        log.info("Successfully created caretaker profile for userId={}", dto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
    }

    /**
     * Assign or update a caretaker's property.
     */
    @PutMapping("/{profileId}/assign-property/{propertyId}")
    public ResponseEntity<GetCaretakerDTO> assignProperty(
            @PathVariable Long profileId,
            @PathVariable Long propertyId) {

        log.info("API call: Assign property {} to caretaker profile {}", propertyId, profileId);

        GetCaretakerDTO updated = caretakerService.updateAssignedProperty(profileId, propertyId);
        return ResponseEntity.ok(updated);
    }

    /**
     * Retrieve a caretaker profile by ID.
     */
    @GetMapping("/{profileId}")
    public ResponseEntity<GetCaretakerDTO> getCaretaker(@PathVariable Long profileId) {

        log.info("API call: Get caretaker profile {}", profileId);

        GetCaretakerDTO dto = caretakerService.getCaretaker(profileId);
        return ResponseEntity.ok(dto);
    }

    /**
     * Retrieve all caretaker profiles.
     */
    @GetMapping
    public ResponseEntity<List<GetCaretakerDTO>> getAllCaretakers() {

        log.info("API call: Get all caretaker profiles");

        List<GetCaretakerDTO> dtos = caretakerService.getAllCaretakers();
        return ResponseEntity.ok(dtos);
    }

    /**
     * Delete a caretaker profile.
     */
    @DeleteMapping("/{profileId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCaretaker(@PathVariable Long profileId) {

        log.info("API call: Delete caretaker profile {}", profileId);

        caretakerService.deleteCaretaker(profileId);
    }
}
