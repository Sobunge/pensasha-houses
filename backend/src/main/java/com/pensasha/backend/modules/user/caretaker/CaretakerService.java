package com.pensasha.backend.modules.user.caretaker;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.PropertyRepository;
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

    private final CaretakerRepository caretakerRepository;
    private final PropertyRepository propertyRepository;
    private final CaretakerMapper caretakerMapper;

    /**
     * Create a new caretaker from a CreateCaretakerDTO.
     *
     * @param dto The DTO containing caretaker info
     * @return The saved caretaker as GetCaretakerDTO
     */
    public GetCaretakerDTO createCaretaker(CreateCaretakerDTO dto) {
        Caretaker caretaker = caretakerMapper.toEntity(dto);

        // Save caretaker
        caretakerRepository.save(caretaker);
        log.info("Created new caretaker with ID {}", caretaker.getId());

        return caretakerMapper.toGetDTO(caretaker);
    }

    /**
     * Assign or update a caretaker's property.
     *
     * @param caretakerId The caretaker's ID
     * @param propertyId  The property ID to assign
     * @return Updated GetCaretakerDTO
     */
    public GetCaretakerDTO updateAssignedProperty(Long caretakerId, Long propertyId) {
        Caretaker caretaker = caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Caretaker not found with ID: " + caretakerId));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Property not found with ID: " + propertyId));

        caretaker.setAssignedProperty(property);
        caretakerRepository.save(caretaker);

        log.info("Assigned property ID {} to caretaker ID {}", propertyId, caretakerId);
        return caretakerMapper.toGetDTO(caretaker);
    }

    /**
     * Retrieve a single caretaker by ID.
     *
     * @param caretakerId The caretaker ID
     * @return GetCaretakerDTO for the caretaker
     */
    public GetCaretakerDTO getCaretaker(Long caretakerId) {
        Caretaker caretaker = caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Caretaker not found with ID: " + caretakerId));

        log.info("Retrieved caretaker with ID {}", caretakerId);
        return caretakerMapper.toGetDTO(caretaker);
    }

    /**
     * Retrieve all caretakers.
     *
     * @return List of GetCaretakerDTO
     */
    public List<GetCaretakerDTO> getAllCaretakers() {
        List<Caretaker> caretakers = caretakerRepository.findAll();
        log.info("Retrieved {} caretakers", caretakers.size());

        return caretakers.stream()
                .map(caretakerMapper::toGetDTO)
                .collect(Collectors.toList());
    }

    /**
     * Delete a caretaker by ID.
     *
     * @param caretakerId The caretaker ID
     */
    public void deleteCaretaker(Long caretakerId) {
        if (!caretakerRepository.existsById(caretakerId)) {
            throw new ResourceNotFoundException(
                    "Caretaker not found with ID: " + caretakerId);
        }

        caretakerRepository.deleteById(caretakerId);
        log.info("Deleted caretaker with ID {}", caretakerId);
    }
}
