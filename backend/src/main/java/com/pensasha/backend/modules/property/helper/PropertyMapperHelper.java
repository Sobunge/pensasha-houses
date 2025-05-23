package com.pensasha.backend.modules.property.helper;

import java.util.HashSet;
import java.util.Set;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.UnitRepository;
import com.pensasha.backend.modules.user.caretaker.Caretaker;
import com.pensasha.backend.modules.user.caretaker.CaretakerRepository;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.landlord.LandLordRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PropertyMapperHelper {

    private final LandLordRepository landLordRepository;
    private final CaretakerRepository caretakerRepository;
    private final UnitRepository unitRepository;

    @Named("landlordIdToLandlord")
    public LandLord getLandlordbyId(Long landlordId) {
        return landLordRepository.findById(landlordId)
                .orElseThrow(() -> new ResourceNotFoundException("LandLord not found with id: " + landlordId));
    }

    @Named("caretakerIdToCaretaker")
    public Caretaker getCaretakerById(Long caretakerId) {
        return caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new ResourceNotFoundException("Caretaker not found with id: " + caretakerId));
    }

    @Named("unitIdsToUnits")
    public Set<Unit> getUnitsFromUnitIds(Set<Long> unitIds) {
        Set<Unit> units = new HashSet<>();

        for (Long id : unitIds) {
            Unit unit = unitRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + id));
            units.add(unit);
        }

        return units;
    }

}
