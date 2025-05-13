package com.pensasha.backend.modules.unit;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service class responsible for managing Unit entities.
 * Provides business logic for CRUD operations, pagination, filtering, and other
 * custom logic related to Units.
 */
@Service
@Slf4j
@AllArgsConstructor
public class UnitService {

    // Injecting the UnitRepository to interact with the database.
    private final UnitRepository unitRepository;

    /**
     * Adds a new unit to the database.
     * 
     * @param unit The unit entity to be added.
     * @return The saved unit entity.
     */
    public Unit addUnit(Unit unit) {
        log.info("Adding new unit: {}", unit);
        return unitRepository.save(unit); // Save the unit in the repository and return the saved entity.
    }

    /**
     * Retrieves a unit by its ID.
     *
     * @param id The ID of the unit to retrieve.
     * @return The found unit entity.
     * @throws ResourceNotFoundException if no unit is found with the given ID.
     */
    public Unit getUnitById(Long id) {
        return unitRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Unit not found with ID: {}", id);
                    return new ResourceNotFoundException("Unit not found with id: " + id);
                });
    }

    /**
     * Retrieves all units with pagination support.
     * 
     * @param page The page number to retrieve.
     * @param size The size (number of units per page).
     * @return A paginated list of units.
     */
    public Page<Unit> getAllUnits(int page, int size) {
        Pageable pageable = PageRequest.of(page, size); // Create Pageable object for pagination.
        return unitRepository.findAll(pageable); // Retrieve all units with pagination.
    }

    /**
     * Updates an existing unit with new details.
     * 
     * @param id          The ID of the unit to update.
     * @param unitDetails The updated unit details.
     * @return The updated unit entity.
     * @throws ResourceNotFoundException if no unit is found with the given ID.
     */
    @Transactional
    public Unit updateUnit(Long id, Unit unitDetails) {
        Unit unit = getUnitById(id); // Retrieve the unit to update (throws exception if not found).

        // Update the unit's fields with the new details.
        unit.setUnitNumber(unitDetails.getUnitNumber());
        unit.setRentAmount(unitDetails.getRentAmount());
        unit.setStatus(unitDetails.getStatus());
        unit.setProperty(unitDetails.getProperty());
        unit.setTenant(unitDetails.getTenant());

        log.info("Updating unit with ID: {}", id);
        return unitRepository.save(unit); // Save and return the updated unit entity.
    }

    /**
     * Deletes a unit from the database.
     * 
     * @param id The ID of the unit to delete.
     * @throws ResourceNotFoundException if no unit is found with the given ID.
     */
    @Transactional
    public void deleteUnit(Long id) {
        Unit unit = getUnitById(id); // Retrieve the unit to delete (throws exception if not found).
        log.info("Deleting unit with ID: {}", id);
        unitRepository.delete(unit); // Delete the unit from the repository.
    }

    /**
     * Checks if a unit is available (not occupied).
     * 
     * @param id The ID of the unit to check.
     * @return true if the unit is available (not occupied), false otherwise.
     * @throws ResourceNotFoundException if no unit is found with the given ID.
     */
    public boolean isUnitAvailable(Long id) {
        Unit unit = getUnitById(id); // Retrieve the unit to check (throws exception if not found).
        return unit.getStatus().equals(UnitStatus.VACANT); // Return true if the unit is not occupied.
    }

    /**
     * Calculates the rent due for a unit.
     * 
     * @param id The ID of the unit to calculate the rent for.
     * @return The rent amount due for the unit.
     * @throws ResourceNotFoundException if no unit is found with the given ID.
     */
    public double calculateRentDue(Long id) {
        Unit unit = getUnitById(id); // Retrieve the unit to calculate rent for (throws exception if not found).
        return unit.getRentAmount(); // Return the rent amount of the unit.
    }
}
