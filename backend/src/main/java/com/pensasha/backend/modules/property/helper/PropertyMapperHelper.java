package com.pensasha.backend.modules.property.helper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.UnitRepository;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfileRepository;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfileRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PropertyMapperHelper {

    private final LandlordProfileRepository landLordRepository;
    private final CaretakerProfileRepository caretakerRepository;
    private final UnitRepository unitRepository;

    @Named("landlordIdToLandlord")
    public LandlordProfile getLandlordbyId(Long landlordId) {
        if (landlordId == null) return null; // Prevent NullPointerException
        return landLordRepository.findById(landlordId)
                .orElseThrow(() -> new ResourceNotFoundException("LandLord not found with id: " + landlordId));
    }

    @Named("caretakerIdToCaretaker")
    public CaretakerProfile getCaretakerById(Long caretakerId) {
        if (caretakerId == null) return null; // Caretaker is optional
        return caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new ResourceNotFoundException("Caretaker not found with id: " + caretakerId));
    }

    /**
     * Optimized to fetch all units in one database round-trip.
     */
    @Named("unitIdsToUnits")
    public Set<Unit> getUnitsFromUnitIds(Set<Long> unitIds) {
        if (unitIds == null || unitIds.isEmpty()) return new HashSet<>();

        List<Unit> foundUnits = unitRepository.findAllById(unitIds);

        // Validation: Ensure all requested IDs actually exist
        if (foundUnits.size() != unitIds.size()) {
            throw new ResourceNotFoundException("One or more Unit IDs provided do not exist.");
        }

        return new HashSet<>(foundUnits);
    }
}