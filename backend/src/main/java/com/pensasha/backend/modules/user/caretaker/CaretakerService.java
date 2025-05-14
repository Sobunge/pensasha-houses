package com.pensasha.backend.modules.user.caretaker;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.PropertyRepository;
import com.pensasha.backend.modules.user.caretaker.dto.CaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.mapper.CaretakerMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j // Lombok annotation for logging
@AllArgsConstructor
@Service
public class CaretakerService {

    private final CaretakerRepository caretakerRepository;
    private final PropertyRepository propertyRepository;
    private final CaretakerMapper careTakerMapper;

    /**
     * Update a caretaker's assigned property.
     * This method fetches a caretaker and a property by their IDs,
     * assigns the property to the caretaker, and saves the caretaker.
     * 
     * @param caretakerId The ID of the caretaker to update.
     * @param propertyId  The ID of the property to assign.
     * @return The updated CareTakerDTO.
     */
    public CaretakerDTO updateAssignedProperty(Long caretakerId, Long propertyId) {
        // Fetch the caretaker by ID
        Caretaker caretaker = caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new ResourceNotFoundException("Caretaker not found with id: " + caretakerId));

        // Fetch the property by ID
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));

        // Assign the property to the caretaker
        caretaker.setAssignedProperty(property);

        // Save the updated caretaker
        caretakerRepository.save(caretaker);

        // Log the update action
        log.info("Assigned property with ID {} to caretaker with ID {}", propertyId, caretakerId);

        // Return the updated caretaker as DTO
        return careTakerMapper.toDTO(caretaker);
    }

    /**
     * Get a single caretaker's details by ID.
     * 
     * @param caretakerId The ID of the caretaker to fetch.
     * @return The CareTakerDTO for the given caretaker.
     */
    public CaretakerDTO getCaretaker(Long caretakerId) {
        // Fetch the caretaker from the repository
        Caretaker caretaker = caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new ResourceNotFoundException("Caretaker not found with id: " + caretakerId));

        // Log the retrieval action
        log.info("Fetched caretaker details with ID {}", caretakerId);

        // Return the caretaker's details as DTO
        return careTakerMapper.toDTO(caretaker);
    }

    /**
     * Get a list of all caretakers' details.
     * 
     * @return A list of CareTakerDTOs for all caretakers.
     */
    public List<CaretakerDTO> getAllCaretakers() {
        // Fetch all caretakers from the repository
        List<Caretaker> caretakers = caretakerRepository.findAll();

        // Log the fetch action
        log.info("Fetched details for {} caretakers", caretakers.size());

        // Map all caretakers to DTOs and return
        return caretakers.stream()
                .map(careTakerMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Delete a caretaker by ID.
     * This method deletes the caretaker after verifying the ID exists in the
     * repository.
     * 
     * @param caretakerId The ID of the caretaker to delete.
     */
    public void deleteCaretaker(Long caretakerId) {
        // Check if the caretaker exists in the repository
        if (!caretakerRepository.existsById(caretakerId)) {
            throw new ResourceNotFoundException("Caretaker not found with id: " + caretakerId);
        }

        // Log the deletion action
        log.info("Deleting caretaker with ID {}", caretakerId);

        // Delete the caretaker by ID
        caretakerRepository.deleteById(caretakerId);
    }
}