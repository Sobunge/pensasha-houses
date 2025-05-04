package com.pensasha.backend.service;

import java.util.*;

import com.pensasha.backend.dto.PropertyDTO;
import com.pensasha.backend.entity.CareTaker;
import com.pensasha.backend.entity.LandLord;
import com.pensasha.backend.entity.Property;
import com.pensasha.backend.repository.PropertyRepository;
import com.pensasha.backend.utils.PropertyMapperUtil;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

/**
 * Service class for managing properties.
 * Handles adding, updating, fetching, and deleting properties, as well as managing landlord and caretaker associations.
 */
@Service
@RequiredArgsConstructor
@Slf4j // Lombok annotation to generate a logger for logging operations
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    /**
     * Adds a new property.
     * Validates and associates a landlord and a caretaker with the property.
     * 
     * @param propertyDTO DTO containing the property details to be added.
     * @return The added property entity.
     * @throws RuntimeException if the landlord or caretaker are not valid.
     */
    @Transactional
    public Property addProperty(PropertyDTO propertyDTO) {
        // Fetch landlord and caretaker users by their ID numbers
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
            throw new RuntimeException(
                    "The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord");
        }
        LandLord landlord = (LandLord) landlordUser; // Cast the user to Landlord

        // Cast the User to Caretaker
        User caretakerUser = caretakerOpt.get();
        if (!(caretakerUser instanceof CareTaker)) {
            log.error("The user with National ID: {} is not a Caretaker", propertyDTO.getCareTakerId());
            throw new RuntimeException(
                    "The user with National ID: " + propertyDTO.getCareTakerId() + " is not a Caretaker");
        }
        CareTaker caretaker = (CareTaker) caretakerUser; // Cast the user to Caretaker

        // Create Property entity and populate fields from DTO
        Property property = new Property();
        property.setName(propertyDTO.getName());
        property.setDescription(propertyDTO.getDescription());
        property.setLocation(propertyDTO.getLocation());
        property.setNumOfUnits(propertyDTO.getNumOfUnits());
        property.setAmenities(propertyDTO.getAmenities());
        property.setLandLord(landlord);
        property.setCareTaker(caretaker); // Can be null
        property.setUnits(new HashSet<>()); // Empty Set (will be added later)

        // Save the Property in the database
        Property savedProperty = propertyRepository.save(property);

        log.info("Property with ID {} has been successfully added", savedProperty.getId());
        return savedProperty;
    }

    /**
     * Updates an existing property.
     * Validates and updates fields like name, description, landlord, and caretaker.
     * 
     * @param propertyId The ID of the property to update.
     * @param propertyDTO DTO containing updated property details.
     * @return The updated property entity.
     * @throws RuntimeException if the property or related entities (landlord/caretaker) are not found.
     */
    @Transactional
    public Property updateProperty(Long propertyId, PropertyDTO propertyDTO) {
        Optional<Property> existingPropertyOpt = propertyRepository.findById(propertyId);

        if (existingPropertyOpt.isEmpty()) {
            log.error("Property with ID {} not found", propertyId);
            throw new RuntimeException("Property with ID " + propertyId + " not found");
        }

        Property existingProperty = existingPropertyOpt.get();

        // Update property fields if new values are provided in the DTO
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

        // Validate and update Landlord if changed
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
                throw new RuntimeException(
                        "The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord");
            }
            LandLord landlord = (LandLord) landlordUser;
            existingProperty.setLandLord(landlord);
        }

        // Validate and update Caretaker if changed
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
            CareTaker caretaker = (CareTaker) caretakerUser;
            existingProperty.setCareTaker(caretaker);
        }

        // Save the updated property
        log.info("Property with ID {} has been successfully updated", propertyId);
        return propertyRepository.save(existingProperty);
    }

    /**
     * Fetches a property by its ID and maps it to a DTO.
     * 
     * @param propertyId The ID of the property to fetch.
     * @return Optional containing PropertyDTO if found, empty if not found.
     */
    public Optional<PropertyDTO> getProperty(Long propertyId) {
        Optional<PropertyDTO> propertyDTO = propertyRepository.findById(propertyId)
                .map(PropertyMapperUtil::mapToDTO); // Map Property entity to DTO

        if (propertyDTO.isPresent()) {
            log.info("Fetched property with ID {}", propertyId);
        } else {
            log.warn("Property with ID {} not found", propertyId);
        }

        return propertyDTO;
    }

    /**
     * Fetches all properties.
     * 
     * @return A list of all property entities.
     */
    public List<Property> getAllProperties() {
        log.info("Fetching all properties");
        return propertyRepository.findAll();
    }

    /**
     * Deletes a property by its ID.
     * 
     * @param propertyId The ID of the property to delete.
     * @throws ResourceNotFoundException if the property with the given ID is not found.
     */
    public void deleteProperty(Long propertyId) {
        if (propertyRepository.existsById(propertyId)) {
            propertyRepository.deleteById(propertyId);
            log.info("Property with ID {} has been successfully deleted", propertyId);
        } else {
            log.error("Property with ID {} not found, cannot delete", propertyId);
            throw new ResourceNotFoundException("Property with ID " + propertyId + " not found.");
        }
    }

    /**
     * Fetches all properties belonging to a landlord identified by their ID number.
     * 
     * @param idNumber The ID number of the landlord.
     * @return A list of properties associated with the specified landlord.
     */
    public Page<Property> gettingPropertiesForLandlord(String idNumber, Pageable pageable) {
        log.info("Fetching properties for landlord with ID number {}", idNumber);
        return propertyRepository.findByLandLordId(idNumber, pageable);
    }
}
