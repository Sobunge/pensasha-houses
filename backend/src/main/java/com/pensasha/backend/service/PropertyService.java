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

    // Getting one property

    // Geting all properties

    // Deleting a property

    // Getting a property belonging to a landlord (Owner)

}
