package com.pensasha.backend.user.models.dto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandLordDTO extends UserDTO{

    private Set<Property> Properties;
    private BankDetails BankDetails;

}
