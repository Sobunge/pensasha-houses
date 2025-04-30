package com.pensasha.backend.service;

import java.util.*;

import com.pensasha.backend.dto.PropertyDTO;
import com.pensasha.backend.entity.CareTaker;
import com.pensasha.backend.entity.LandLord;
import com.pensasha.backend.entity.Property;
import com.pensasha.backend.entity.User;
import com.pensasha.backend.repository.PropertyRepository;
import com.pensasha.backend.repository.UserRepository;
import com.pensasha.backend.utils.PropertyMapperUtil;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j // Lombok annotation to generate logger
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    // Adding a property
    @Transactional
    public Property addProperty(PropertyDTO propertyDTO) {
        Optional<User> landlordOpt = userRepository.findByIdNumber(propertyDTO.getLandLordId());
        Optional<User> caretakerOpt = userRepository.findByIdNumber(propertyDTO.getCareTakerId());

        // Validate Landlord
        if (landlordOpt.isEmpty()) {
            log.error("A Landlord with National ID: {} not found", propertyDTO.getLandLordId());
            throw new RuntimeException("A Landlord with National ID: " + propertyDTO.getLandLordId() + " not found");
        }

        User landlordUser = landlordOpt.get();

        if (!(landlordUser instanceof LandLord)) {
            log.error("The user with National ID: {} is not a Landlord", propertyDTO.getLandLordId());
            throw new RuntimeException("The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord");
        }
        LandLord landlord = (LandLord) landlordUser; // Cast the user to Landlord

        // Cast the User to Caretaker
        User caretakerUser = caretakerOpt.get();

        if (!(caretakerUser instanceof CareTaker)) {
            log.error("The user with National ID: {} is not a Caretaker", propertyDTO.getCareTakerId());
            throw new RuntimeException("The user with National ID: " + propertyDTO.getCareTakerId() + " is not a Caretaker");
        }
        CareTaker caretaker = (CareTaker) caretakerUser; // Cast the user to Caretaker

        // Create Property
        Property property = new Property();
        property.setName(propertyDTO.getName());
        property.setDescription(propertyDTO.getDescription());
        property.setLocation(propertyDTO.getLocation());
        property.setNumOfUnits(propertyDTO.getNumOfUnits());
        property.setAmenities(propertyDTO.getAmenities());
        property.setLandLord(landlord);
        property.setCareTaker(caretaker); // Can be null
        property.setUnits(new HashSet<>()); // Empty Set (will be added later)

        // Save the Property
        Property savedProperty = propertyRepository.save(property);

        log.info("Property with ID {} has been successfully added", savedProperty.getId());

        return savedProperty;
    }

    // Updating property details
    @Transactional
    public Property updateProperty(Long propertyId, PropertyDTO propertyDTO) {
        Optional<Property> existingPropertyOpt = propertyRepository.findById(propertyId);

        if (existingPropertyOpt.isEmpty()) {
            log.error("Property with ID {} not found", propertyId);
            throw new RuntimeException("Property with ID " + propertyId + " not found");
        }

        Property existingProperty = existingPropertyOpt.get();

        // Update fields if new values are provided
        if (propertyDTO.getName() != null) {
            existingProperty.setName(propertyDTO.getName());
        }
        if (propertyDTO.getDescription() != null) {
            existingProperty.setDescription(propertyDTO.getDescription());
        }
        if (propertyDTO.getLocation() != null) {
            existingProperty.setLocation(propertyDTO.getLocation());
        }
        if (propertyDTO.getNumOfUnits() > 0) {
            existingProperty.setNumOfUnits(propertyDTO.getNumOfUnits());
        }
        if (propertyDTO.getAmenities() != null) {
            existingProperty.setAmenities(propertyDTO.getAmenities());
        }

        // Validate and update Landlord (if changed)
        if (propertyDTO.getLandLordId() != null
                && !propertyDTO.getLandLordId().equals(existingProperty.getLandLord().getIdNumber())) {
            Optional<User> landlordOpt = userRepository.findByIdNumber(propertyDTO.getLandLordId());
            if (landlordOpt.isEmpty()) {
                log.error("Landlord with National ID: {} not found", propertyDTO.getLandLordId());
                throw new RuntimeException("Landlord with National ID: " + propertyDTO.getLandLordId() + " not found");
            }
            User landlordUser = landlordOpt.get();
            if (!(landlordUser instanceof LandLord)) {
                log.error("The user with National ID: {} is not a Landlord", propertyDTO.getLandLordId());
                throw new RuntimeException("The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord");
            }

            LandLord landlord = (LandLord) landlordUser; // Cast the user to Landlord

            existingProperty.setLandLord(landlord);
        }

        // Validate and update Caretaker (if changed)
        if (propertyDTO.getCareTakerId() != null && (existingProperty.getCareTaker() == null
                || !propertyDTO.getCareTakerId().equals(existingProperty.getCareTaker().getIdNumber()))) {
            Optional<User> caretakerOpt = userRepository.findByIdNumber(propertyDTO.getCareTakerId());
            if (caretakerOpt.isEmpty()) {
                log.error("Caretaker with National ID: {} not found", propertyDTO.getCareTakerId());
                throw new RuntimeException(
                        "Caretaker with National ID: " + propertyDTO.getCareTakerId() + " not found");
            }
            User caretakerUser = caretakerOpt.get();
            if (!(caretakerUser instanceof CareTaker)) {
                log.error("The user with National ID: {} is not a Caretaker", propertyDTO.getCareTakerId());
                throw new RuntimeException(
                        "The user with National ID: " + propertyDTO.getCareTakerId() + " is not a Caretaker");
            }

            CareTaker caretaker = (CareTaker) caretakerUser; // Cast the user to Caretaker

            existingProperty.setCareTaker(caretaker);
        }

        // Save updated property
        log.info("Property with ID {} has been successfully updated", propertyId);

        return propertyRepository.save(existingProperty);
    }

    public Optional<PropertyDTO> getProperty(Long propertyId) {
        Optional<PropertyDTO> propertyDTO = propertyRepository.findById(propertyId)
                .map(PropertyMapperUtil::mapToDTO); // Wrap result in Optional
        
        if (propertyDTO.isPresent()) {
            log.info("Fetched property with ID {}", propertyId);
        } else {
            log.warn("Property with ID {} not found", propertyId);
        }
        
        return propertyDTO;
    }
    
    // Get all properties
    public List<Property> getAllProperties() {
        log.info("Fetching all properties");
        return propertyRepository.findAll();
    }

    // Deleting a property
    public void deleteProperty(Long propertyId) {
        if (propertyRepository.existsById(propertyId)) {
            propertyRepository.deleteById(propertyId);
            log.info("Property with ID {} has been successfully deleted", propertyId);
        } else {
            log.error("Property with ID {} not found, cannot delete", propertyId);
            throw new ResourceNotFoundException("Property with ID " + propertyId + " not found.");
        }
    }

    // Getting a property belonging to a landlord (Owner)
    public List<Property> gettingPropertiesForLandlord(String idNumber) {
        log.info("Fetching properties for landlord with ID number {}", idNumber);
        return propertyRepository.findAllByLandLord_IdNumber(idNumber);
    }
}
