package com.pensasha.backend.modules.user.caretaker;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.user.caretaker.dto.CreateCaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.dto.GetCaretakerDTO;

import java.util.List;

/**
 * REST Controller for managing caretakers.
 */
@Slf4j
@RestController
@RequestMapping("/api/caretakers")
@RequiredArgsConstructor
public class CaretakerController {

    private final CaretakerService caretakerService;

    /**
     * Create a new caretaker.
     */
    @PostMapping
    public ResponseEntity<GetCaretakerDTO> createCaretaker(
            @RequestBody CreateCaretakerDTO dto) {

        log.info("API call: Create caretaker");
        GetCaretakerDTO created = caretakerService.createCaretaker(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Assign or update a caretaker's property.
     */
    @PutMapping("/{caretakerId}/assign-property/{propertyId}")
    public ResponseEntity<GetCaretakerDTO> assignProperty(
            @PathVariable Long caretakerId,
            @PathVariable Long propertyId) {

        log.info("API call: Assign property {} to caretaker {}", propertyId, caretakerId);
        return ResponseEntity.ok(
                caretakerService.updateAssignedProperty(caretakerId, propertyId));
    }

    /**
     * Retrieve a caretaker by ID.
     */
    @GetMapping("/{caretakerId}")
    public ResponseEntity<GetCaretakerDTO> getCaretaker(
            @PathVariable Long caretakerId) {

        log.info("API call: Get caretaker {}", caretakerId);
        return ResponseEntity.ok(caretakerService.getCaretaker(caretakerId));
    }

    /**
     * Retrieve all caretakers.
     */
    @GetMapping
    public ResponseEntity<List<GetCaretakerDTO>> getAllCaretakers() {
        log.info("API call: Get all caretakers");
        return ResponseEntity.ok(caretakerService.getAllCaretakers());
    }

    /**
     * Delete a caretaker.
     */
    @DeleteMapping("/{caretakerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCaretaker(@PathVariable Long caretakerId) {
        log.info("API call: Delete caretaker {}", caretakerId);
        caretakerService.deleteCaretaker(caretakerId);
    }
}
