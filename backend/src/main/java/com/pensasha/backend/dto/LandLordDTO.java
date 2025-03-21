package com.pensasha.backend.dto;

import java.util.Set;

import com.pensasha.backend.entity.BankDetails;
import com.pensasha.backend.entity.Property;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LandLordDTO extends UserDTO{

    private Set<Property> Properties;
    private  BankDetails bankDetails;

}
