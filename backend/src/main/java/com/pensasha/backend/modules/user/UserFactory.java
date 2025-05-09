package com.pensasha.backend.modules.user;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.lease.LeaseService;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.UnitService;
import com.pensasha.backend.modules.user.caretaker.CareTaker;
import com.pensasha.backend.modules.user.caretaker.dto.CareTakerDTO;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.landlord.dto.LandLordDTO;
import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Factory component responsible for creating specific User entity instances
 * based on the given UserDTO and its role.
 */
@Component
@AllArgsConstructor
@Slf4j // Lombok annotation to auto-generate a logger named 'log'
public class UserFactory {

    private final UnitService unitService;
    private final PasswordEncoder passwordEncoder;
    private final LeaseService leaseService;

    /**
     * Creates and returns a User entity (or a subclass of User) based on the type
     * of UserDTO provided.
     * The role field in the DTO determines which subclass is created.
     *
     * @param userDTO The data transfer object containing user information.
     * @return A new User (Admin, Tenant, Landlord, or CareTaker) entity with
     *         populated fields.
     */
    public User createUser(CreateUserDTO userDTO) {

        log.info("Creating user for role: {}", userDTO.getRole());

        // If the DTO is a CareTakerDTO, create and return a CareTaker entity
        if (userDTO instanceof CareTakerDTO careTakerDTO) {
            CareTaker careTaker = new CareTaker();
            copyCommonUserAttributes(careTaker, careTakerDTO);
            copyCareTakerAttributes(careTaker, careTakerDTO);
            log.debug("Created CareTaker: {}", careTaker.getIdNumber());
            return careTaker;

            // If the DTO is a LandLordDTO, create and return a LandLord entity
        } else if (userDTO instanceof LandLordDTO landLordDTO) {
            LandLord landLord = new LandLord();
            copyCommonUserAttributes(landLord, landLordDTO);
            copyLandlordAttributes(landLord, landLordDTO);
            log.debug("Created LandLord: {}", landLord.getIdNumber());
            return landLord;

            // If the DTO is a TenantDTO, create and return a Tenant entity
        } else if (userDTO instanceof TenantDTO tenantDTO) {
            Tenant tenant = new Tenant();
            copyCommonUserAttributes(tenant, tenantDTO);
            copyTenantAttributes(tenant, tenantDTO);
            log.debug("Created Tenant: {}", tenant.getIdNumber());
            return tenant;

            // If the role is ADMIN but not a subclass, create a generic User entity as an
            // admin
        } else if (userDTO.getRole() == Role.ADMIN) {
            User admin = new User();
            copyCommonUserAttributes(admin, userDTO);
            admin.setRole(Role.ADMIN);
            log.debug("Created Admin: {}", admin.getIdNumber());
            return admin;

            // If none of the expected types match, throw an error
        } else {
            log.error("Invalid user role: {}", userDTO.getRole());
            throw new IllegalArgumentException("Invalid user type provided for ID: " + userDTO.getIdNumber());
        }
    }

    /**
     * Helper method to copy common user fields from a DTO to a User entity.
     * Encodes the password and handles optional fields like profile picture.
     *
     * @param user    The target User entity.
     * @param userDTO The source DTO with user input data.
     */
    private void copyCommonUserAttributes(User user, CreateUserDTO userDTO) {
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

    /**
     * Helper method to copy tenant-specific fields from a TenantDTO to a Tenant
     * entity.
     *
     * @param tenant    The target Tenant entity.s
     * @param tenantDTO The source DTO containing tenant-specific details.
     */
    private void copyTenantAttributes(Tenant tenant, TenantDTO tenantDTO) {

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
    private void copyLandlordAttributes(LandLord landLord, LandLordDTO landLordDTO) {
        landLord.setProperties(landLordDTO.getProperties());
        landLord.setBankDetails(landLordDTO.getBankDetails());
    }

    /**
     * Helper method to copy caretaker-specific fields from a CareTakerDTO to a
     * CareTaker entity.
     *
     * @param careTaker    The target CareTaker entity.
     * @param careTakerDTO The source DTO containing caretaker-specific details.
     */
    private void copyCareTakerAttributes(CareTaker careTaker, CareTakerDTO careTakerDTO) {
        careTaker.setAssignedProperty(careTakerDTO.getAssignedProperty());
    }

}
