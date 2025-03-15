package com.pensasha.backend.houses.dto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {

    private LandLord landLord;
    private Set<Unit> units;

}
