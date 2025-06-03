package com.pensasha.backend.modules.user;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.property.*;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.lease.LeaseService;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.UnitService;
import com.pensasha.backend.modules.user.caretaker.Caretaker;
import com.pensasha.backend.modules.user.caretaker.dto.CaretakerDTO;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import com.pensasha.backend.modules.user.landlord.BankDetails;
import com.pensasha.backend.modules.user.landlord.BankDetailsRepository;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.landlord.dto.LandLordDTO;
import com.pensasha.backend.modules.user.landlord.dto.UpdateLandlordDTO;
import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserServiceHelper {

    // Dependencies injected via constructor
    private final PasswordEncoder passwordEncoder;
    private final UnitService unitService;
    private final LeaseService leaseService;
    private final PropertyRepository propertyRepository;
    private final BankDetailsRepository bankDetailsRepository;

    /**
     * Copies common user fields from a CreateUserDTO to a User entity.
     * Encodes the password securely and sets optional fields like profile picture.
     *
     * @param user    Target User entity.
     * @param userDTO Source DTO with user-provided input data.
     */
    public void copyCommonUserAttributes(User user, CreateUserDTO userDTO) {
        user.setFirstName(userDTO.getFirstName());
        user.setSecondName(userDTO.getSecondName());
        user.setThirdName(userDTO.getThirdName());
        user.setIdNumber(userDTO.getIdNumber());

        // Encode and set password
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setRole(userDTO.getRole());

        // Only set profile picture if present and not empty
        if (userDTO.getProfilePicture() != null && !userDTO.getProfilePicture().isEmpty()) {
            user.setProfilePicture(userDTO.getProfilePicture());
        }
    }

    /**
     * Updates common user fields for an existing User entity from an UpdateUserDTO.
     *
     * @param user    Existing User entity to be updated.
     * @param userDTO DTO containing updated user data.
     */
    public void updateCommonUserAttributes(User user, UpdateUserDTO userDTO) {
        user.setFirstName(userDTO.getFirstName());
        user.setSecondName(userDTO.getSecondName());
        user.setThirdName(userDTO.getThirdName());
        user.setIdNumber(userDTO.getIdNumber());
        user.setPhoneNumber(userDTO.getPhoneNumber());
    }

    /**
     * Copies common user attributes from one User entity to another.
     *
     * @param target Target User entity.
     * @param source Source User entity.
     */
    public void copyCommonAttributes(User target, User source) {
        target.setFirstName(source.getFirstName());
        target.setSecondName(source.getSecondName());
        target.setThirdName(source.getThirdName());
        target.setIdNumber(source.getIdNumber());
        target.setPassword(source.getPassword());
        target.setPhoneNumber(source.getPhoneNumber());

        // Copy profile picture only if it exists and is not empty
        if (source.getProfilePicture() != null && !source.getProfilePicture().isEmpty()) {
            target.setProfilePicture(source.getProfilePicture());
        }
    }

    /**
     * Copies tenant-specific fields from a TenantDTO to a Tenant entity.
     * Includes rental units, leases, and emergency contact.
     *
     * @param tenant    Target Tenant entity.
     * @param tenantDTO Source DTO with tenant-specific details.
     */
    public void copyTenantAttributes(Tenant tenant, TenantDTO tenantDTO) {
        // Convert rental unit IDs to actual Unit entities
        List<Unit> rentalUnits = Optional.ofNullable(tenantDTO.getRentalUnitIds())
                .orElse(Collections.emptyList())
                .stream()
                .map(unitService::getUnitById)
                .toList();

        tenant.setRentalUnits(rentalUnits);

        // Convert lease IDs to actual Lease entities
        List<Lease> leases = Optional.ofNullable(tenantDTO.getLeaseIds())
                .orElse(Collections.emptyList())
                .stream()
                .map(leaseService::getLeaseById)
                .toList();

        tenant.setLeases(leases);

        // Set emergency contact information
        tenant.setEmergencyContact(tenantDTO.getEmergencyContact());
    }

    /**
     * Copies landlord-specific fields from a LandLordDTO to a LandLord entity.
     * Includes associated properties and bank details.
     *
     * @param landLord    Target LandLord entity.
     * @param landLordDTO Source DTO with landlord-specific details.
     */
    public void copyLandlordAttributes(LandLord landLord, LandLordDTO landLordDTO) {

        if (landLordDTO.getPropertyIds() != null && !landLordDTO.getPropertyIds().isEmpty()) {
            Set<Property> properties = new HashSet<>();

            // Retrieve and add each property by ID, throwing exception if not found
            for (Long id : landLordDTO.getPropertyIds()) {
                Property property = propertyRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Property with id: " + id + " not found."));
                properties.add(property);
            }
            landLord.setProperties(properties);
        }

        // Retrieve and set bank details, throwing exception if not found
        if (landLordDTO.getBankDetailsId() != null) {
            BankDetails bankDetails = bankDetailsRepository.findById(landLordDTO.getBankDetailsId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Bank details with id: " + landLordDTO.getBankDetailsId() + " not found."));

            landLord.setBankDetails(bankDetails);
        }
    }

    /**
     * Updates landlord-specific fields using an UpdateLandlordDTO.
     * Updates personal details, associated properties, and bank details.
     *
     * @param landLord    Target LandLord entity.
     * @param landLordDTO DTO with updated landlord information.
     */
    public void updateLandlordAttributes(LandLord landLord, UpdateLandlordDTO landLordDTO) {
        landLord.setFirstName(landLordDTO.getFirstName());
        landLord.setSecondName(landLordDTO.getSecondName());
        landLord.setThirdName(landLordDTO.getThirdName());
        landLord.setIdNumber(landLordDTO.getIdNumber());
        landLord.setPhoneNumber(landLordDTO.getPhoneNumber());

        // Convert property IDs to Property entities, throwing exception if not found
        Set<Property> properties = landLordDTO.getPropertyIds()
                .stream()
                .map(id -> propertyRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Property with id: " + id + " not found.")))
                .collect(Collectors.toSet());

        landLord.setProperties(properties);

        // Directly set updated bank details
        landLord.setBankDetails(landLordDTO.getBankDetails());
    }

    /**
     * Copies caretaker-specific fields from a CaretakerDTO to a Caretaker entity.
     * Associates the caretaker with a property based on the provided property ID.
     * 
     * If the property is not found, assigns a new (empty) Property instance
     * instead.
     * (Consider whether this fallback is intended, or if throwing an exception
     * might be safer.)
     *
     * @param careTaker    Target Caretaker entity to populate.
     * @param careTakerDTO Source DTO containing caretaker-specific details.
     */
    public void copyCareTakerAttributes(Caretaker careTaker, CaretakerDTO careTakerDTO) {
        // Retrieve property by ID, fallback to new Property() if not found
        Property property = propertyRepository.findById(careTakerDTO.getPropertyId())
                .orElse(new Property());

        // Associate the property with the caretaker
        careTaker.setAssignedProperty(property);
    }

    /**
     * Updates caretaker-specific fields for an existing Caretaker entity.
     * Associates caretaker with a different property if needed.
     *
     * @param careTaker    Target Caretaker entity.
     * @param careTakerDTO DTO with updated caretaker-specific details.
     */
    public void updateCareTakerAttributes(Caretaker careTaker, CaretakerDTO careTakerDTO) {
        // Retrieve and set new property assignment
        Property property = propertyRepository.findById(careTakerDTO.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "A property with id: " + careTakerDTO.getPropertyId() + " not found."));

        careTaker.setAssignedProperty(property);
    }
}
