package com.pensasha.backend.dto;

import com.pensasha.backend.entity.Property;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CareTakerDTO extends UserDTO {

    private Property assignedProperty;

}
