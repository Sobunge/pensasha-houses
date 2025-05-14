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

    @Mapping(target = "propertyIds", source = "properties", qualifiedByName = "propertySetToIds")
    @Mapping(target = "bankDetailsId", source = "bankDetails.id")
    LandLordDTO toDTO(LandLord landLord);

    @Mapping(target = "properties", source = "propertyIds", qualifiedByName = "idsToPropertySet")
    @Mapping(target = "accountExpirationDate", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "locked", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "passwordExpirationDate", ignore = true)
     @Mapping(target = "bankDetails", source = "bankDetailsId")
    LandLord toEntity(LandLordDTO landlordDTO);

    // Helper method for converting Set<Property> to Set<Long>
    @Named("propertySetToIds")
    default Set<Long> mapPropertiesToIds(Set<Property> properties) {
        return properties.stream()
                .map(Property::getId)
                .collect(Collectors.toSet());
    }

    // Helper method for converting Set<Long> to Set<Property>
    @Named("idsToPropertySet")
    default Set<Property> idsToPropertySet(Set<Long> propertyIds) {
        Set<Property> properties = new HashSet<>();

        for (Long propertyId : propertyIds) {
            Property property = new Property();
            property.setId(propertyId); // Simulating the setting of the ID
            properties.add(property);
        }

        return properties;
    }

     // Map the BankDetails by ID (you may need to modify this depending on how you're fetching BankDetails)
    default BankDetails mapBankDetails(Long bankDetailsId) {
        // Here, you could fetch the actual BankDetails from the database using the ID.
        // For now, let's assume we're creating a dummy BankDetails instance with the given ID.
        BankDetails bankDetails = new BankDetails();
        bankDetails.setId(bankDetailsId);
        return bankDetails;
    }
}
