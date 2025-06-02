package com.pensasha.backend.modules.user.caretaker.dto;

import com.pensasha.backend.modules.user.dto.CreateUserDTO;

import lombok.*;

// Lombok annotation to generate getter methods automatically for all fields in the class
@Getter
// Lombok annotation to generate setter methods automatically for all fields in
// the class
@Setter
// Lombok annotation to generate a no-argument constructor automatically
@NoArgsConstructor
// Lombok annotation to generate an all-arguments constructor automatically
@AllArgsConstructor
public class CaretakerDTO extends CreateUserDTO {

    // A reference to the Property object that is assigned to the caretaker
    private Long propertyId;
}
