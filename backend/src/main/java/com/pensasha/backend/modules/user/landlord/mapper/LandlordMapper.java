package com.pensasha.backend.modules.user.landlord.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.Permission;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.landlord.BankDetails;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.landlord.dto.BankDetailsDTO;

@Mapper(componentModel = "spring")
public interface LandlordMapper {

    @Mapping(target = "firstName", source = "user.firstName")
    @Mapping(target = "middleName", source = "user.middleName")
    @Mapping(target = "lastName", source = "user.lastName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "phoneNumber", source = "user.phoneNumber")
    @Mapping(target = "idNumber", source = "user.idNumber")
    @Mapping(target = "profilePicture", source = "user.profilePictureUrl")
    @Mapping(target = "permissions", source = "profile", qualifiedByName = "extractPermissions")
    @Mapping(target = "roles", source = "user.roles", qualifiedByName = "rolesToStrings")
    @Mapping(target = "propertyIds", source = "properties", qualifiedByName = "propertySetToIds")
    @Mapping(target = "bankDetails", source = "bankDetails")
    @Mapping(target = "userId", source = "id")
    @Mapping(target = "bankDetailsId", ignore = true)
    com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO toGetDTO(LandlordProfile profile);

    /* ===================== NESTED MAPPINGS ===================== */

    BankDetailsDTO toBankDetailsDTO(BankDetails bankDetails);

    /* ===================== HELPER METHODS ===================== */

    @Named("propertySetToIds")
    default Set<Long> propertySetToIds(Set<Property> properties) {
        if (properties == null || properties.isEmpty()) {
            return Set.of();
        }
        return properties.stream().map(Property::getId).collect(Collectors.toSet());
    }

    @Named("rolesToStrings")
    default Set<String> rolesToStrings(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) {
            return Set.of();
        }
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

    @Named("extractPermissions")
    default Set<String> extractPermissions(LandlordProfile profile) {
        if (profile == null || profile.getUser() == null || profile.getUser().getRoles() == null) {
            return Set.of();
        }
        Set<String> permissions = new HashSet<>();
        for (Role role : profile.getUser().getRoles()) {
            if (role.getPermissions() != null) {
                for (Permission permission : role.getPermissions()) {
                    if (permission != null && permission.getName() != null) {
                        permissions.add(permission.getName());
                    }
                }
            }
        }
        return permissions;
    }
}