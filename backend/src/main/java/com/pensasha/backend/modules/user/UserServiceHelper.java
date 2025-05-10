package com.pensasha.backend.modules.user;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.property.*;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.lease.LeaseService;
import com.pensasha.backend.modules.property.PropertyService;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.UnitService;
import com.pensasha.backend.modules.user.caretaker.CareTaker;
import com.pensasha.backend.modules.user.caretaker.dto.CareTakerDTO;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.landlord.LandlordRepository;
import com.pensasha.backend.modules.user.landlord.dto.LandLordDTO;
import com.pensasha.backend.modules.user.landlord.dto.UpdateLandlordDTO;
import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserServiceHelper {

    private final LandlordRepository landlordRepository;
    private final PasswordEncoder passwordEncoder;
    private final UnitService unitService;
    private final LeaseService leaseService;
    private final PropertyRepository propertyRepository;

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
S
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
        landLord.setProperties(landLordDTO.getProperties());
        landLord.setBankDetails(landLordDTO.getBankDetails());
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

        landLord.setBankDetails(new LandLordDTO(
            updateLandLordDTO.
        ));
    }

    /**
     * Helper method to copy caretaker-specific fields from a CareTakerDTO to a
     * CareTaker entity.
     *
     * @param careTaker    The target CareTaker entity.
     * @param careTakerDTO The source DTO containing caretaker-specific details.
     */
    public void copyCareTakerAttributes(CareTaker careTaker, CareTakerDTO careTakerDTO) {
        careTaker.setAssignedProperty(careTakerDTO.getAssignedProperty());
    }

    public void updateCareTakerAttributes(CareTaker careTaker, CareTakerDTO careTakerDTO) {
        careTaker.setAssignedProperty(careTakerDTO.getAssignedProperty());
    }

}
