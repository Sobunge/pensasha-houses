package com.pensasha.backend.modules.user.landlord.dto;

import java.util.Set;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;

import lombok.*;

// Lombok annotation to generate getter methods automatically for all fields in the class
@Getter
// Lombok annotation to generate setter methods automatically for all fields in the class
@Setter
// Lombok annotation to generate a no-argument constructor automatically
@NoArgsConstructor
// Lombok annotation to generate an all-arguments constructor automatically
@AllArgsConstructor
public class LandLordDTO extends CreateUserDTO {

    // A set of properties that belong to the landlord
    private Set<Property> Properties;

    // The bank details associated with the landlord
    private BankDetailsDTO bankDetails;
}
