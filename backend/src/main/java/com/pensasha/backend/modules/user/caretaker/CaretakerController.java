package com.pensasha.backend.modules.user.caretaker;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.user.caretaker.dto.CaretakerDTO;

import java.util.List;

/**
 * REST Controller for managing caretaker operations.
 * Handles HTTP requests related to caretaker creation, retrieval, update, and
 * deletion.
 */
@Slf4j // Lombok annotation for logging
@RestController
@RequestMapping("/api/caretakers")
public class CaretakerController {

    @Autowired
    private CaretakerService caretakerService;

    /**
     * Update the assigned property of a caretaker.
     *
     * @param caretakerId ID of the caretaker to update.
     * @param propertyId  ID of the property to assign.
     * @return Updated CareTakerDTO.
     */
    @PutMapping("/{caretakerId}/assign-property/{propertyId}")
    public CaretakerDTO assignProperty(
            @PathVariable Long caretakerId,
            @PathVariable Long propertyId) {
        log.info("Received request to assign property {} to caretaker {}", propertyId, caretakerId);
        return caretakerService.updateAssignedProperty(caretakerId, propertyId);
    }

    /**
     * Get the details of a specific caretaker.
     *
     * @param caretakerId ID of the caretaker to fetch.
     * @return CareTakerDTO containing caretaker details.
     */
    @GetMapping("/{caretakerId}")
    public CaretakerDTO getCaretaker(@PathVariable Long caretakerId) {
        log.info("Fetching caretaker with ID {}", caretakerId);
        return caretakerService.getCaretaker(caretakerId);
    }

    /**
     * Get a list of all caretakers.
     *
     * @return List of CareTakerDTO objects.
     */
    @GetMapping
    public List<CaretakerDTO> getAllCaretakers() {
        log.info("Fetching all caretakers");
        return caretakerService.getAllCaretakers();
    }

    /**
     * Delete a caretaker by ID.
     *
     * @param caretakerId ID of the caretaker to delete.
     */
    @DeleteMapping("/{caretakerId}")
    public void deleteCaretaker(@PathVariable Long caretakerId) {
        log.info("Deleting caretaker with ID {}", caretakerId);
        caretakerService.deleteCaretaker(caretakerId);
    }
}