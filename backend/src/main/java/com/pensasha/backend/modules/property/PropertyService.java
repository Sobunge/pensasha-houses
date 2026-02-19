package com.pensasha.backend.modules.property;

import java.util.HashSet;
import java.util.Optional;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.property.mapper.PropertyMapper;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfileRepository;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final LandlordProfileRepository landlordProfileRepository;
    private final CaretakerProfileRepository caretakerProfileRepository;
    private final PropertyMapper propertyMapper;

    @Transactional
    public Property addProperty(PropertyDTO propertyDTO) {
        Property property = new Property();

        // Fetch landlord profile
        LandlordProfile landlord = landlordProfileRepository.findById(propertyDTO.getLandLordId())
                .orElseThrow(() -> {
                    log.error("Landlord with ID {} not found", propertyDTO.getLandLordId());
                    return new RuntimeException("Landlord with ID " + propertyDTO.getLandLordId() + " not found");
                });
        property.setLandlord(landlord);

        // Fetch caretaker profile if provided
        if (propertyDTO.getCareTakerId() != null) {
            CaretakerProfile caretaker = caretakerProfileRepository.findById(propertyDTO.getCareTakerId())
                    .orElseThrow(() -> {
                        log.error("Caretaker with ID {} not found", propertyDTO.getCareTakerId());
                        return new RuntimeException("Caretaker with ID " + propertyDTO.getCareTakerId() + " not found");
                    });
            property.setCaretaker(caretaker);
        }

        // Populate remaining fields
        property.setName(propertyDTO.getName());
        property.setDescription(propertyDTO.getDescription());
        property.setLocation(propertyDTO.getLocation());
        property.setNumOfUnits(propertyDTO.getNumOfUnits());
        property.setAmenities(propertyDTO.getAmenities());
        property.setUnits(new HashSet<>());

        Property saved = propertyRepository.save(property);
        log.info("Property with ID {} successfully added", saved.getId());
        return saved;
    }

    @Transactional
    public Property updateProperty(Long propertyId, PropertyDTO propertyDTO) {
        // Fetch existing property or throw an exception if not found
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> {
                    log.error("Property with ID {} not found", propertyId);
                    return new RuntimeException("Property with ID " + propertyId + " not found");
                });

        // Update basic fields if provided
        Optional.ofNullable(propertyDTO.getName()).ifPresent(property::setName);
        Optional.ofNullable(propertyDTO.getDescription()).ifPresent(property::setDescription);
        Optional.ofNullable(propertyDTO.getLocation()).ifPresent(property::setLocation);
        if (propertyDTO.getNumOfUnits() > 0) {
            property.setNumOfUnits(propertyDTO.getNumOfUnits());
        }
        Optional.ofNullable(propertyDTO.getAmenities()).ifPresent(property::setAmenities);

        // Update landlord if a new ID is provided and differs from current
        if (propertyDTO.getLandLordId() != null &&
                (property.getLandlord() == null
                        || !propertyDTO.getLandLordId().equals(property.getLandlord().getId()))) {

            LandlordProfile landlord = landlordProfileRepository.findById(propertyDTO.getLandLordId())
                    .orElseThrow(() -> new RuntimeException(
                            "Landlord with ID " + propertyDTO.getLandLordId() + " not found"));
            property.setLandlord(landlord);
        }

        // Update caretaker if a new ID is provided and differs from current
        if (propertyDTO.getCareTakerId() != null &&
                (property.getCaretaker() == null
                        || !propertyDTO.getCareTakerId().equals(property.getCaretaker().getId()))) {

            CaretakerProfile caretaker = caretakerProfileRepository.findById(propertyDTO.getCareTakerId())
                    .orElseThrow(() -> new RuntimeException(
                            "Caretaker with ID " + propertyDTO.getCareTakerId() + " not found"));
            property.setCaretaker(caretaker);
        }

        // Save changes
        Property saved = propertyRepository.save(property);
        log.info("Property with ID {} successfully updated", propertyId);
        return saved;
    }

    public Optional<PropertyDTO> getProperty(Long propertyId) {
        Optional<PropertyDTO> dto = propertyRepository.findById(propertyId)
                .map(propertyMapper::toDTO);

        dto.ifPresentOrElse(
                d -> log.info("Fetched property with ID {}", propertyId),
                () -> log.warn("Property with ID {} not found", propertyId));

        return dto;
    }

    public Page<Property> getAllProperties(Pageable pageable) {
        log.info("Fetching all properties");
        return propertyRepository.findAll(pageable);
    }

    public void deleteProperty(Long propertyId) {
        if (!propertyRepository.existsById(propertyId)) {
            log.error("Property with ID {} not found, cannot delete", propertyId);
            throw new ResourceNotFoundException("Property with ID " + propertyId + " not found.");
        }
        propertyRepository.deleteById(propertyId);
        log.info("Property with ID {} successfully deleted", propertyId);
    }

    public Page<Property> getPropertiesForLandlord(Long landlordId, Pageable pageable) {
        log.info("Fetching properties for landlord with ID {}", landlordId);
        return propertyRepository.findByLandlord_User_IdNumber(landlordId.toString(), pageable);
    }

}
