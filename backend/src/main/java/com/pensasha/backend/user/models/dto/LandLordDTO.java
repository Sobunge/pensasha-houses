package com.pensasha.backend.user.models.dto;

import java.util.Set;

import com.pensasha.backend.houses.Property;
import com.pensasha.backend.bankDetails.BankDetails;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LandLordDTO extends UserDTO{

    private Set<Property> Properties;
    private  BankDetails bankDetails;

}
