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
import com.pensasha.backend.modules.user.landlord.dto.CreateLandLordDTO;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;

@Mapper(componentModel = "spring")
public interface LandlordMapper {

    // ---------------------- Entity -> Get DTO ----------------------
    @Mapping(target = "propertyIds", source = "properties", qualifiedByName = "propertySetToIds")
    @Mapping(target = "bankDetailsId", source = "bankDetails.id")
    GetLandLordDTO toGetDTO(LandLord landLord);

    // ---------------------- Create DTO -> Entity ----------------------
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "middleName", ignore = true)
    @Mapping(target = "lastName", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Mapping(target = "profilePicture", ignore = true)
    @Mapping(target = "properties", source = "propertyIds", qualifiedByName = "idsToPropertySet")
    @Mapping(target = "bankDetails", source = "bankDetailsId", qualifiedByName = "mapBankDetails")
    LandLord toEntity(CreateLandLordDTO createLandLordDTO);

    // ---------------------- Helper Methods ----------------------
    @Named("propertySetToIds")
    default Set<Long> propertySetToIds(Set<Property> properties) {
        if (properties == null || properties.isEmpty()) return new HashSet<>();
        return properties.stream()
                .map(Property::getId)
                .collect(Collectors.toSet());
    }

    @Named("idsToPropertySet")
    default Set<Property> idsToPropertySet(Set<Long> propertyIds) {
        Set<Property> properties = new HashSet<>();
        if (propertyIds != null && !propertyIds.isEmpty()) {
            for (Long id : propertyIds) {
                if (id != null) {
                    Property property = new Property();
                    property.setId(id);
                    properties.add(property);
                }
            }
        }
        return properties;
    }

    @Named("mapBankDetails")
    default BankDetails mapBankDetails(Long bankDetailsId) {
        if (bankDetailsId == null) return null;
        BankDetails bankDetails = new BankDetails();
        bankDetails.setId(bankDetailsId);
        return bankDetails;
    }
}
