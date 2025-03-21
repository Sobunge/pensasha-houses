package com.pensasha.backend.dto;

import java.util.Set;

import com.pensasha.backend.entity.LandLord;
import com.pensasha.backend.entity.Unit;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {

    private LandLord landLord;
    private Set<Unit> units;

}
