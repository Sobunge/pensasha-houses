package com.pensasha.backend.dto;

import java.util.Set;

import com.pensasha.backend.entity.BankDetails;
import com.pensasha.backend.entity.Property;

import lombok.*;

// Lombok annotation to generate getter methods automatically for all fields in the class
@Getter
// Lombok annotation to generate setter methods automatically for all fields in the class
@Setter
// Lombok annotation to generate a no-argument constructor automatically
@NoArgsConstructor
// Lombok annotation to generate an all-arguments constructor automatically
@AllArgsConstructor
public class LandLordDTO extends UserDTO {

    // A set of properties that belong to the landlord
    private Set<Property> Properties;

    // The bank details associated with the landlord
    private BankDetails bankDetails;
}
