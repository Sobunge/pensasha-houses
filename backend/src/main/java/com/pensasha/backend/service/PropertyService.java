package com.pensasha.backend.service;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import com.pensasha.backend.controller.PropertyController;
import com.pensasha.backend.dto.PropertyDTO;
import com.pensasha.backend.entity.CareTaker;
import com.pensasha.backend.entity.LandLord;
import com.pensasha.backend.entity.Property;
import com.pensasha.backend.entity.Role;
import com.pensasha.backend.entity.User;
import com.pensasha.backend.repository.PropertyRepository;
import com.pensasha.backend.repository.UserRepository;
import com.pensasha.backend.utils.PropertyMapperUtil;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    // Adding a property
    @Transactional
    public ResponseEntity<EntityModel<Property>> addProperty(PropertyDTO propertyDTO) {
        Optional<User> landlordOpt = userRepository.findByIdNumber(propertyDTO.getLandLordId());
        Optional<User> caretakerOpt = userRepository.findByIdNumber(propertyDTO.getCareTakerId());

        // Validate Landlord
        if (landlordOpt.isEmpty()) {
            throw new RuntimeException("A Landlord with National ID: " + propertyDTO.getLandLordId() + " not found");
        }

        User landlordUser = landlordOpt.get();

        if (!(landlordUser instanceof LandLord)) {
            throw new RuntimeException(
                    "The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord");
        }
        LandLord landlord = (LandLord) landlordUser; // Cast the user to Landlord

        // Cast the User to Caretaker
        User caretakerUser = caretakerOpt.get();

        if (!(caretakerUser instanceof CareTaker)) {
            throw new RuntimeException(
                    "The user with National ID: " + propertyDTO.getCareTakerId() + " is not a Caretaker");
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

        // Create the EntityModel for Property with HATEOAS links
        EntityModel<Property> propertyModel = EntityModel.of(savedProperty,
                linkTo(methodOn(PropertyController.class).getProperty(savedProperty.getId())).withSelfRel(),
                linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));
    }

    // Updating property details
    @Transactional
    public Property updateProperty(Long propertyId, PropertyDTO propertyDTO) {
        Optional<Property> existingPropertyOpt = propertyRepository.findById(propertyId);

        if (existingPropertyOpt.isEmpty()) {
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
                throw new RuntimeException("Landlord with National ID: " + propertyDTO.getLandLordId() + " not found");
            }
            User landlordUser = landlordOpt.get();
            if (!(landlordUser instanceof LandLord)) {
                throw new RuntimeException(
                        "The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord");
            }

            LandLord landlord = (LandLord) landlordUser; // Cast the user to Landlord

            existingProperty.setLandLord(landlord);
        }

        // Validate and update Caretaker (if changed)
        if (propertyDTO.getCareTakerId() != null && (existingProperty.getCareTaker() == null
                || !propertyDTO.getCareTakerId().equals(existingProperty.getCareTaker().getIdNumber()))) {
            Optional<User> caretakerOpt = userRepository.findByIdNumber(propertyDTO.getCareTakerId());
            if (caretakerOpt.isEmpty()) {
                throw new RuntimeException(
                        "Caretaker with National ID: " + propertyDTO.getCareTakerId() + " not found");
            }
            User caretakerUser = caretakerOpt.get();
            if (!(caretakerUser instanceof CareTaker)) {
                throw new RuntimeException(
                        "The user with National ID: " + propertyDTO.getCareTakerId() + " is not a Caretaker");
            }

            CareTaker caretaker = (CareTaker) caretakerUser; // Cast the user to Caretaker

            existingProperty.setCareTaker(caretaker);
        }

        // Save updated property
        return propertyRepository.save(existingProperty);

    }

    // Getting one property
    public PropertyDTO getProperty(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property with ID " + propertyId + " not found"));

        PropertyDTO propertyDTO = PropertyMapperUtil.mapToDTO(property);

        return propertyDTO;
    }

    // Geting all properties
    public List<PropertyDTO> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        return properties.stream()
                .map(property -> new PropertyDTO(
                        property.getName(),
                        property.getDescription(),
                        property.getLocation(),
                        property.getNumOfUnits(),
                        property.getAmenities(),
                        property.getLandLord().getIdNumber(), // Return only ID to avoid exposing the whole entity
                        property.getCareTaker().getIdNumber(),
                        property.getUnits()))
                .collect(Collectors.toList());
    }

    // Deleting a property
    public void deleteProperty(Long propertyId) {
        if (propertyRepository.existsById(propertyId)) {
            propertyRepository.deleteById(propertyId);
        } else {
            throw new ResourceNotFoundException("Property with ID " + propertyId + " not found.");
        }
    }

    // Getting a property belonging to a landlord (Owner)
    public List<Property> gettingPropertiesForLandlord(String idNumber) {
        return propertyRepository.findAllByLandLord_IdNumber(idNumber);
    }

}
