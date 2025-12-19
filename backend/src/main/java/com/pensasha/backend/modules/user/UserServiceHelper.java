package com.pensasha.backend.modules.user;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.PropertyRepository;
import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.lease.LeaseService;
import com.pensasha.backend.modules.unit.Unit;
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
import com.pensasha.backend.exceptions.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserServiceHelper {

    private final PasswordEncoder passwordEncoder;
    private final LeaseService leaseService;
    private final PropertyRepository propertyRepository;
    private final BankDetailsRepository bankDetailsRepository;

    /* ------------------------ Common User Methods ------------------------ */

    public void copyCommonUserAttributes(User user, CreateUserDTO userDTO) {
        user.setIdNumber(userDTO.getIdNumber());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());
    }

    public void updateCommonUserAttributes(User user, UpdateUserDTO userDTO) {
        user.setFirstName(userDTO.getFirstName());
        user.setSecondName(userDTO.getSecondName());
        user.setThirdName(userDTO.getThirdName());
        user.setIdNumber(userDTO.getIdNumber());
        user.setPhoneNumber(userDTO.getPhoneNumber());
    }

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

    /* ------------------------ Tenant Methods ------------------------ */

    /**
     * Copies tenant-specific fields from a TenantDTO to a Tenant entity.
     * Only sets leases and emergency contact.
     */
    public void copyTenantAttributes(Tenant tenant, TenantDTO tenantDTO) {

        // Map lease IDs to Lease entities
        if (tenantDTO.getLeaseIds() != null && !tenantDTO.getLeaseIds().isEmpty()) {
            List<Lease> leases = tenantDTO.getLeaseIds().stream()
                    .map(leaseService::getLeaseById)
                    .toList();
            tenant.setLeases(leases);
        }

        // Set emergency contact if present
        if (tenantDTO.getEmergencyContact() != null) {
            tenant.setEmergencyContact(tenantDTO.getEmergencyContact());
        }
    }

    /**
     * Converts a Tenant entity to TenantDTO.
     * Unit IDs are derived from leases.
     */
    public TenantDTO toTenantDTO(Tenant tenant) {
        TenantDTO dto = new TenantDTO();

        dto.setId(tenant.getId());
        dto.setEmergencyContact(tenant.getEmergencyContact());

        // Lease IDs
        List<Long> leaseIds = tenant.getLeases() == null ? List.of()
                : tenant.getLeases().stream()
                        .map(Lease::getId)
                        .toList();
        dto.setLeaseIds(leaseIds);

        // Unit IDs derived from leases
        List<Long> unitIds = tenant.getLeases() == null ? List.of()
                : tenant.getLeases().stream()
                        .map(Lease::getUnit)
                        .filter(u -> u != null)
                        .map(Unit::getId)
                        .distinct()
                        .toList();
        dto.setUnitIds(unitIds);

        return dto;
    }

    /* ------------------------ Landlord Methods ------------------------ */

    public void copyLandlordAttributes(LandLord landLord, LandLordDTO landLordDTO) {

        if (landLordDTO.getPropertyIds() != null && !landLordDTO.getPropertyIds().isEmpty()) {
            Set<Property> properties = new HashSet<>();
            for (Long id : landLordDTO.getPropertyIds()) {
                Property property = propertyRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Property with id: " + id + " not found."));
                properties.add(property);
            }
            landLord.setProperties(properties);
        }

        if (landLordDTO.getBankDetailsId() != null) {
            BankDetails bankDetails = bankDetailsRepository.findById(landLordDTO.getBankDetailsId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Bank details with id: " + landLordDTO.getBankDetailsId() + " not found."));
            landLord.setBankDetails(bankDetails);
        }
    }

    public void updateLandlordAttributes(LandLord landLord, UpdateLandlordDTO landLordDTO) {
        landLord.setFirstName(landLordDTO.getFirstName());
        landLord.setSecondName(landLordDTO.getSecondName());
        landLord.setThirdName(landLordDTO.getThirdName());
        landLord.setIdNumber(landLordDTO.getIdNumber());
        landLord.setPhoneNumber(landLordDTO.getPhoneNumber());

        Set<Property> properties = landLordDTO.getPropertyIds().stream()
                .map(id -> propertyRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Property with id: " + id + " not found.")))
                .collect(Collectors.toSet());
        landLord.setProperties(properties);

        landLord.setBankDetails(landLordDTO.getBankDetails());
    }

    /* ------------------------ Caretaker Methods ------------------------ */

    public void copyCareTakerAttributes(Caretaker careTaker, CaretakerDTO careTakerDTO) {
        if (careTakerDTO.getPropertyId() != null) {
            Property property = propertyRepository.findById(careTakerDTO.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Property with ID: " + careTakerDTO.getPropertyId() + " not found."));
            careTaker.setAssignedProperty(property);
        }
    }

    public void updateCareTakerAttributes(Caretaker careTaker, CaretakerDTO careTakerDTO) {
        Property property = propertyRepository.findById(careTakerDTO.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "A property with id: " + careTakerDTO.getPropertyId() + " not found."));
        careTaker.setAssignedProperty(property);
    }
}
