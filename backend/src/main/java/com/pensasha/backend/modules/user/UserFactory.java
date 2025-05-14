package com.pensasha.backend.modules.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.pensasha.backend.modules.user.caretaker.Caretaker;
import com.pensasha.backend.modules.user.caretaker.dto.CaretakerDTO;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.landlord.dto.LandLordDTO;
import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

import lombok.extern.slf4j.Slf4j;

/**
 * Factory component responsible for creating specific User entity instances
 * based on the given UserDTO and its role.
 */
@Component
@Slf4j // Lombok annotation to auto-generate a logger named 'log'
public class UserFactory {

    @Autowired
    private UserServiceHelper userServiceHelper;

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

        log.info("Creating user with role: {}", userDTO.getRole());

        // If the DTO is a CareTakerDTO, create and return a CareTaker entity
        if (userDTO instanceof CaretakerDTO careTakerDTO) {
            Caretaker careTaker = new Caretaker();
            userServiceHelper.copyCommonUserAttributes(careTaker, careTakerDTO);
            userServiceHelper.copyCareTakerAttributes(careTaker, careTakerDTO);
            log.debug("Created CareTaker: {}", careTaker.getIdNumber());
            return careTaker;

            // If the DTO is a LandLordDTO, create and return a LandLord entity
        } else if (userDTO instanceof LandLordDTO landLordDTO) {
            LandLord landLord = new LandLord();
            userServiceHelper.copyCommonUserAttributes(landLord, landLordDTO);
            userServiceHelper.copyLandlordAttributes(landLord, landLordDTO);
            log.debug("Created LandLord: {}", landLord.getIdNumber());
            return landLord;

            // If the DTO is a TenantDTO, create and return a Tenant entity
        } else if (userDTO instanceof TenantDTO tenantDTO) {
            Tenant tenant = new Tenant();
            userServiceHelper.copyCommonUserAttributes(tenant, tenantDTO);
            userServiceHelper.copyTenantAttributes(tenant, tenantDTO);
            log.debug("Created Tenant: {}", tenant.getIdNumber());
            return tenant;

            // If the role is ADMIN but not a subclass, create a generic User entity as an
            // admin
        } else if (userDTO.getRole() == Role.ADMIN) {
            User admin = new User();
            userServiceHelper.copyCommonUserAttributes(admin, userDTO);
            admin.setRole(Role.ADMIN);
            log.debug("Created Admin: {}", admin.getIdNumber());
            return admin;

            // If none of the expected types match, throw an error
        } else {
            log.error("Invalid user role: {}", userDTO.getRole());
            throw new IllegalArgumentException("Invalid user type provided for ID: " + userDTO.getIdNumber());
        }
    }

}
