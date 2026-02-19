package com.pensasha.backend.modules.property.helper;

import java.util.HashSet;
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

/**
 * Helper class used by MapStruct mappers to convert entity IDs to actual entity objects.
 * This class provides custom mapping methods to fetch related entities from the database
 * during DTO-to-Entity conversions.
 */
@Component // Marks this class as a Spring-managed component for dependency injection
@AllArgsConstructor // Generates a constructor with all final fields as parameters
public class PropertyMapperHelper {

    // Repositories for accessing LandLord, Caretaker, and Unit entities
    private final LandlordProfileRepository landLordRepository;
    private final CaretakerProfileRepository caretakerRepository;
    private final UnitRepository unitRepository;

    /**
     * Maps a landlord ID to a LandLord entity.
     *
     * @param landlordId the ID of the landlord
     * @return the LandLord entity
     * @throws ResourceNotFoundException if no landlord is found with the given ID
     */
    @Named("landlordIdToLandlord") // Exposes this method to MapStruct with a specific name
    public LandlordProfile getLandlordbyId(Long landlordId) {
        return landLordRepository.findById(landlordId)
                .orElseThrow(() -> new ResourceNotFoundException("LandLord not found with id: " + landlordId));
    }

    /**
     * Maps a caretaker ID to a Caretaker entity.
     *
     * @param caretakerId the ID of the caretaker
     * @return the Caretaker entity
     * @throws ResourceNotFoundException if no caretaker is found with the given ID
     */
    @Named("caretakerIdToCaretaker")
    public CaretakerProfile getCaretakerById(Long caretakerId) {
        return caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new ResourceNotFoundException("Caretaker not found with id: " + caretakerId));
    }

    /**
     * Maps a set of unit IDs to a set of Unit entities.
     *
     * @param unitIds the set of unit IDs
     * @return a set containing the corresponding Unit entities
     * @throws ResourceNotFoundException if any unit ID does not correspond to an existing Unit
     */
    @Named("unitIdsToUnits")
    public Set<Unit> getUnitsFromUnitIds(Set<Long> unitIds) {
        Set<Unit> units = new HashSet<>();

        // Iterate through each ID, fetch the corresponding Unit entity and add it to the set
        for (Long id : unitIds) {
            Unit unit = unitRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + id));
            units.add(unit);
        }

        return units;
    }
}
