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

    private final PasswordEncoder passwordEncoder;
    private final UnitService unitService;
    private final LeaseService leaseService;
    private final PropertyRepository propertyRepository;
    private final BankDetailsRepository bankDetailsRepository;

    /**
     * Helper method to copy common user fields from a DTO to a User entity.
     * Encodes the password and handles optional fields like profile picture.
     *
     * @param user    The target User entity.
     * @param userDTO The source DTO with user input data.
     */
    public void copyCommonUserAttributes(User user, CreateUserDTO userDTO) {
        user.setFirstName(userDTO.getFirstName());
        user.setSecondName(userDTO.getSecondName());
        user.setThirdName(userDTO.getThirdName());
        user.setIdNumber(userDTO.getIdNumber());

        // Password is securely encoded before saving
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setRole(userDTO.getRole());

        // Set profile picture only if it is not null or empty
        if (userDTO.getProfilePicture() != null && !userDTO.getProfilePicture().isEmpty()) {
            user.setProfilePicture(userDTO.getProfilePicture());
        }
    }

    public void updateCommonUserAttributes(User user, UpdateUserDTO userDTO) {
        user.setFirstName(userDTO.getFirstName());
        user.setSecondName(userDTO.getSecondName());
        user.setThirdName(userDTO.getThirdName());
        user.setIdNumber(userDTO.getIdNumber());
        user.setPhoneNumber(userDTO.getPhoneNumber());
    }

    /**
     * Copies common attributes from one User entity to another.
     *
     * @param target Target user entity.
     * @param source Source user entity.
     */
    public void copyCommonAttributes(User target, User source) {
        target.setFirstName(source.getFirstName());
        target.setSecondName(source.getSecondName());
        target.setThirdName(source.getThirdName());
        target.setIdNumber(source.getIdNumber());
        target.setPassword(source.getPassword());
        target.setPhoneNumber(source.getPhoneNumber());

        if (source.getProfilePicture() != null && !source.getProfilePicture().isEmpty()) {
            target.setProfilePicture(source.getProfilePicture());
        }
    }

    /**
     * Helper method to copy tenant-specific fields from a TenantDTO to a Tenant
     * entity.
     *
     * @param tenant    The target Tenant entity.s
     * @param tenantDTO The source DTO containing tenant-specific details.
     */
    public void copyTenantAttributes(Tenant tenant, TenantDTO tenantDTO) {

        List<Unit> rentalUnits = Optional.ofNullable(tenantDTO.getRentalUnitIds())
                .orElse(Collections.emptyList())
                .stream()
                .map(unitService::getUnitById)
                .toList();

        tenant.setRentalUnits(rentalUnits);

        List<Lease> leases = Optional.ofNullable(tenantDTO.getLeaseIds()).orElse(Collections.emptyList())
                .stream()
                .map(leaseService::getLeaseById)
                .toList();

        tenant.setLeases(leases);

        tenant.setEmergencyContact(tenantDTO.getEmergencyContact());
    }

    /**
     * Helper method to copy landlord-specific fields from a LandLordDTO to a
     * LandLord entity.
     *
     * @param landLord    The target LandLord entity.
     * @param landLordDTO The source DTO containing landlord-specific details.
     */
    public void copyLandlordAttributes(LandLord landLord, LandLordDTO landLordDTO) {

        Set<Property> properties = new HashSet<>();

        for (Long id : landLordDTO.getPropertyIds()) {
            Property property = propertyRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Property with id: " + id + " could not be found."));
            properties.add(property);
        }

        landLord.setProperties(properties);

        BankDetails bankDetails = bankDetailsRepository.findById(landLordDTO.getBankDetailsId())
                .orElseThrow(() -> new ResourceNotFoundException("Bank Details with id: " + landLordDTO.getBankDetailsId() + " not found."));

        landLord.setBankDetails(bankDetails);
    }

    public void updateLandlordAttributes(LandLord landLord, UpdateLandlordDTO landLordDTO) {

        landLord.setFirstName(landLordDTO.getFirstName());
        landLord.setSecondName(landLordDTO.getSecondName());
        landLord.setThirdName(landLordDTO.getThirdName());
        landLord.setIdNumber(landLordDTO.getIdNumber());
        landLord.setPhoneNumber(landLordDTO.getPhoneNumber());

        Set<Property> properties = landLordDTO.getPropertyIds()
                .stream()
                .map(id -> propertyRepository.findById(id)
                        .orElseThrow(
                                () -> new ResourceNotFoundException("Property with id: " + id + " not found.")))
                .collect(Collectors.toSet());

        landLord.setProperties(properties);

        landLord.setBankDetails(landLordDTO.getBankDetails());

    }

    /**
     * Helper method to copy caretaker-specific fields from a CareTakerDTO to a
     * CareTaker entity.
     *
     * @param careTaker    The target CareTaker entity.
     * @param careTakerDTO The source DTO containing caretaker-specific details.
     */
    public void copyCareTakerAttributes(Caretaker careTaker, CaretakerDTO careTakerDTO) {
        Property property = propertyRepository.findById(careTakerDTO.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "A property with id: " + careTakerDTO.getPropertyId() + " not found."));

        careTaker.setAssignedProperty(property);
    }

    public void updateCareTakerAttributes(Caretaker careTaker, CaretakerDTO careTakerDTO) {
        Property property = propertyRepository.findById(careTakerDTO.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "A property with id: " + careTakerDTO.getPropertyId() + " not found."));

        careTaker.setAssignedProperty(property);
    }

}
