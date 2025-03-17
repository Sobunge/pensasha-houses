package com.pensasha.backend.houses.dto;

import java.util.Set;

import com.pensasha.backend.houses.Unit;
import com.pensasha.backend.user.models.LandLord;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {

    private LandLord landLord;
    private Set<Unit> units;

}
