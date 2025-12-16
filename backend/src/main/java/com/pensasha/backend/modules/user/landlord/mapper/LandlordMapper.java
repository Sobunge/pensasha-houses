package com.pensasha.backend.modules.user.landlord.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.landlord.BankDetails;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.landlord.dto.LandLordDTO;

@Mapper(componentModel = "spring")
public interface LandlordMapper {

    // Entity -> DTO
    @Mapping(target = "propertyIds", source = "properties", qualifiedByName = "propertySetToIds")
    @Mapping(target = "bankDetailsId", source = "bankDetails.id")
    LandLordDTO toDTO(LandLord landLord);

    // DTO -> Entity
    @Mapping(target = "properties", source = "propertyIds", qualifiedByName = "idsToPropertySet")
    @Mapping(target = "accountExpirationDate", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "locked", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "passwordExpirationDate", ignore = true)
    @Mapping(target = "bankDetails", source = "bankDetailsId", qualifiedByName = "mapBankDetails")
    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "secondName", ignore = true)
    @Mapping(target = "thirdName", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Mapping(target = "profilePicture", ignore = true)
    LandLord toEntity(LandLordDTO landlordDTO);

    // Helper: Set<Property> -> Set<Long>
    @Named("propertySetToIds")
    default Set<Long> propertySetToIds(Set<Property> properties) {
        if (properties == null)
            return new HashSet<>();
        return properties.stream()
                .map(Property::getId)
                .collect(Collectors.toSet());
    }

    // Helper: Set<Long> -> Set<Property>
    @Named("idsToPropertySet")
    default Set<Property> idsToPropertySet(Set<Long> propertyIds) {
        Set<Property> properties = new HashSet<>();
        if (propertyIds != null) {
            for (Long propertyId : propertyIds) {
                if (propertyId != null) {
                    Property property = new Property();
                    property.setId(propertyId);
                    properties.add(property);
                }
            }
        }
        return properties;
    }

    // Helper: bankDetailsId -> BankDetails entity
    @Named("mapBankDetails")
    default BankDetails mapBankDetails(Long bankDetailsId) {
        if (bankDetailsId == null)
            return null;
        BankDetails bankDetails = new BankDetails();
        bankDetails.setId(bankDetailsId);
        return bankDetails;
    }
}
