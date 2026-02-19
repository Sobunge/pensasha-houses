package com.pensasha.backend.modules.user.caretaker;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.PropertyRepository;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.caretaker.dto.CreateCaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.dto.GetCaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.mapper.CaretakerMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class CaretakerService {

    private final CaretakerProfileRepository caretakerRepository;
    private final PropertyRepository propertyRepository;
    private final CaretakerMapper caretakerMapper;

    /**
     * Create a new caretaker profile linked to a User.
     */
    public GetCaretakerDTO createCaretaker(CreateCaretakerDTO dto, User user) {
        // Map DTO to entity
        CaretakerProfile profile = caretakerMapper.toEntity(dto);

        // Link the profile to the user
        profile.setUser(user);

        caretakerRepository.save(profile);
        log.info("Created new caretaker profile with ID {}", profile.getId());

        return caretakerMapper.toGetDTO(profile);
    }

    /**
     * Assign or update a caretaker's property.
     */
    public GetCaretakerDTO updateAssignedProperty(Long caretakerProfileId, Long propertyId) {
        CaretakerProfile profile = caretakerRepository.findById(caretakerProfileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Caretaker profile not found with ID: " + caretakerProfileId));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Property not found with ID: " + propertyId));

        profile.setAssignedProperty(property);
        caretakerRepository.save(profile);

        log.info("Assigned property ID {} to caretaker profile ID {}", propertyId, caretakerProfileId);
        return caretakerMapper.toGetDTO(profile);
    }

    /**
     * Retrieve a single caretaker profile by ID.
     */
    public GetCaretakerDTO getCaretaker(Long caretakerProfileId) {
        CaretakerProfile profile = caretakerRepository.findById(caretakerProfileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Caretaker profile not found with ID: " + caretakerProfileId));

        log.info("Retrieved caretaker profile with ID {}", caretakerProfileId);
        return caretakerMapper.toGetDTO(profile);
    }

    /**
     * Retrieve all caretaker profiles.
     */
    public List<GetCaretakerDTO> getAllCaretakers() {
        List<CaretakerProfile> profiles = caretakerRepository.findAll();
        log.info("Retrieved {} caretaker profiles", profiles.size());

        return profiles.stream()
                .map(caretakerMapper::toGetDTO)
                .collect(Collectors.toList());
    }

    /**
     * Delete a caretaker profile by ID.
     */
    public void deleteCaretaker(Long caretakerProfileId) {
        if (!caretakerRepository.existsById(caretakerProfileId)) {
            throw new ResourceNotFoundException(
                    "Caretaker profile not found with ID: " + caretakerProfileId);
        }

        caretakerRepository.deleteById(caretakerProfileId);
        log.info("Deleted caretaker profile with ID {}", caretakerProfileId);
    }
}
