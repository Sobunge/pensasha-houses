package com.pensasha.backend.dto;

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
public class CareTakerDTO extends UserDTO {

    // A reference to the Property object that is assigned to the caretaker
    private Property assignedProperty;
}
