package com.pensasha.backend.service;

import java.util.Optional;

import com.pensasha.backend.dto.PropertyDTO;
import com.pensasha.backend.entity.Property;
import com.pensasha.backend.entity.Role;
import com.pensasha.backend.entity.User;
import com.pensasha.backend.repository.PropertyRepository;
import com.pensasha.backend.repository.UserRepository;

@Service
@RequiredArgConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    // Adding a property
    @Transactional
    public String addProperty(@Valid PropertyDTO propertyDTO) {
        Optional<User> landlordOpt = userRepository.findByIdNumber(propertyDTO.getLandLordId());
        Optional<User> caretakerOpt = userRepository.findByIdNumber(propertyDTO.getCareTakerId());

        // Validate Landlord
        if (landlordOpt.isEmpty()) {
            return "A Landlord with National ID: " + propertyDTO.getLandLordId() + " not found";
        }
        User landlord = landlordOpt.get();
        if (!Role.LANDLORD.equals(landlord.getRole())) {
            return "The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord";
        }

        // Validate Caretaker (if provided)
        User caretaker = null;
        if (propertyDTO.getCareTakerId() != null) {
            if (caretakerOpt.isEmpty()) {
                return "A Caretaker with National ID: " + propertyDTO.getCareTakerId() + " not found";
            }
            caretaker = caretakerOpt.get();
            if (!Role.CARETAKER.equals(caretaker.getRole())) {
                return "The user with National ID: " + propertyDTO.getCareTakerId() + " is not a Caretaker";
            }
        }

        // Create Property
        Property property = new Property();
        property.setName(propertyDTO.getName());
        property.setDescription(propertyDTO.getDescription());
        property.setLocation(propertyDTO.getLocation());
        property.setNumOfUnits(propertyDTO.getNoOfUnits());
        property.setAmenities(propertyDTO.getAmenities());
        property.setLandLord(landlord);
        property.setCareTaker(caretaker); // Can be null
        property.setUnits(new HashSet<>()); // Empty Set (will be added later)

        propertyRepository.save(property);
        return "Property saved successfully";
    }

    // Updating property details
    @Transactional
    public String updateProperty(Long propertyId, @Valid PropertyDTO propertyDTO) {
        Optional<Property> existingPropertyOpt = propertyRepository.findById(propertyId);

        if (existingPropertyOpt.isEmpty()) {
            return "Property with ID " + propertyId + " not found";
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
        if (propertyDTO.getNoOfUnits() > 0) {
            existingProperty.setNumOfUnits(propertyDTO.getNoOfUnits());
        }
        if (propertyDTO.getAmenities() != null) {
            existingProperty.setAmenities(propertyDTO.getAmenities());
        }

        // Validate and update Landlord (if changed)
        if (propertyDTO.getLandLordId() != null
                && !propertyDTO.getLandLordId().equals(existingProperty.getLandLord().getIdNumber())) {
            Optional<User> landlordOpt = userRepository.findByIdNumber(propertyDTO.getLandLordId());
            if (landlordOpt.isEmpty()) {
                return "Landlord with National ID: " + propertyDTO.getLandLordId() + " not found";
            }
            User landlord = landlordOpt.get();
            if (!Role.LANDLORD.equals(landlord.getRole())) {
                return "The user with National ID: " + propertyDTO.getLandLordId() + " is not a Landlord";
            }
            existingProperty.setLandLord(landlord);
        }

        // Validate and update Caretaker (if changed)
        if (propertyDTO.getCareTakerId() != null && (existingProperty.getCareTaker() == null
                || !propertyDTO.getCareTakerId().equals(existingProperty.getCareTaker().getIdNumber()))) {
            Optional<User> caretakerOpt = userRepository.findByIdNumber(propertyDTO.getCareTakerId());
            if (caretakerOpt.isEmpty()) {
                return "Caretaker with National ID: " + propertyDTO.getCareTakerId() + " not found";
            }
            User caretaker = caretakerOpt.get();
            if (!Role.CARETAKER.equals(caretaker.getRole())) {
                return "The user with National ID: " + propertyDTO.getCareTakerId() + " is not a Caretaker";
            }
            existingProperty.setCareTaker(caretaker);
        }

        // Save updated property
        propertyRepository.save(existingProperty);
        return "Property updated successfully";
    }

    // Getting one property
    public PropertyDTO getProperty(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property with ID " + propertyId + " not found"));

        return new PropertyDTO(property.getName(), property.getDescription(), property.getLocation(),
                property.getNumOfUnits(), property.getAmenities(), property.getLandLord(), property.getCareTaker(),
                property.getUnits());
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
                        property.getLandLord().getId(), // Return only ID to avoid exposing the whole entity
                        property.getCareTaker().getId(),
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

}
