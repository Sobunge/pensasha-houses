package com.pensasha.backend.modules.user.landlord.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;

@Mapper(componentModel = "spring")
public interface LandlordMapper {

    /*
     * ============================================================
     * Entity -> Get DTO (READ MODEL)
     * ============================================================
     */

    @Mapping(target = "firstName", source = "user.firstName")
    @Mapping(target = "middleName", source = "user.middleName")
    @Mapping(target = "lastName", source = "user.lastName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "phoneNumber", source = "user.phoneNumber")
    @Mapping(target = "idNumber", source = "user.idNumber")
    @Mapping(target = "profilePicture", source = "user.profilePictureUrl")
    @Mapping(target = "permissions", source = "profile", qualifiedByName = "extractPermissions")

    // 🔥 FIX: Explicit role mapping
    @Mapping(target = "roles", source = "user.roles", qualifiedByName = "rolesToStrings")

    @Mapping(target = "propertyIds", source = "properties", qualifiedByName = "propertySetToIds")

    @Mapping(target = "bankDetailsId", expression = "java(profile.getBankDetails() != null ? profile.getBankDetails().getId() : null)")
    GetLandLordDTO toGetDTO(LandlordProfile profile);

    /*
     * ============================================================
     * Helper Methods
     * ============================================================
     */

    @Named("propertySetToIds")
    default Set<Long> propertySetToIds(Set<Property> properties) {
        if (properties == null || properties.isEmpty()) {
            return Set.of();
        }

        return properties.stream()
                .map(Property::getId)
                .collect(Collectors.toSet());
    }

    // 🔥 FIX: Explicit Role -> String mapping
    @Named("rolesToStrings")
    default Set<String> rolesToStrings(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) {
            return Set.of();
        }

        return roles.stream()
                .map(Role::getName) // ⚠️ or Role::name if it's an enum
                .collect(Collectors.toSet());
    }

    default Set<String> mapPermissions(Set<Role> roles) {
        if (roles == null || roles.isEmpty())
            return Set.of();
        return roles.stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(p -> p.getName())
                .collect(Collectors.toSet());
    }

    @Named("extractPermissions")
    default Set<String> extractPermissions(LandlordProfile profile) {
        if (profile == null)
            return Set.of();

        var user = profile.getUser();
        if (user == null)
            return Set.of();

        var roles = user.getRoles();
        if (roles == null || roles.isEmpty())
            return Set.of();

        return roles.stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(p -> p.getName())
                .collect(Collectors.toSet());
    }
}