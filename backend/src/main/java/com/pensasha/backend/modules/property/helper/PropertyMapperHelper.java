package com.pensasha.backend.modules.property.helper;

import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.unit.UnitRepository;
import com.pensasha.backend.modules.user.caretaker.CaretakerRepository;
import com.pensasha.backend.modules.user.landlord.LandLordRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PropertyMapperHelper {

    private final LandLordRepository landLordRepository;
    private final CaretakerRepository caretakerRepository;
    private final UnitRepository unitRepository;


}
