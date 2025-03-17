package com.pensasha.backend.user.models.dto;

import com.pensasha.backend.houses.Property;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CareTakerDTO extends UserDTO {

    private Property assignedProperty;

}
