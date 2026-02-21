package com.pensasha.backend.modules.user.landlord.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.property.Property;
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
    @Mapping(target = "roles", source = "user.roles") // updated to multi-role
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
}