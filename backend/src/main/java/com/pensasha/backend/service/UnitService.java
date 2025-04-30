package com.pensasha.backend.service;

import com.pensasha.backend.entity.Unit;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.repository.UnitRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service class responsible for managing Unit entities.
 * Provides business logic for CRUD operations, pagination, filtering, and other custom logic related to Units.
 */
@Service
public class UnitService {

    // Injecting the UnitRepository to interact with the database.
    private final UnitRepository unitRepository;

    /**
     * Constructor-based dependency injection for the UnitRepository.
     *
     * @param unitRepository Unit repository for database interactions.
     */
    public UnitService(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    /**
     * Adds a new unit to the database.
     * 
     * @param unit The unit entity to be added.
     * @return The saved unit entity.
     */
    public Unit addUnit(Unit unit) {
        return unitRepository.save(unit);  // Save the unit in the repository and return the saved entity.
    }

    /**
     * Retrieves a unit by its ID.
     *
     * @param id The ID of the unit to retrieve.
     * @return The found unit entity.
     * @throws UnitNotFoundException if no unit is found with the given ID.
     */
    public Unit getUnitById(Long id) {
        return unitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + id));
    }

    /**
     * Retrieves all units with pagination support.
     * 
     * @param page The page number to retrieve.
     * @param size The size (number of units per page).
     * @return A paginated list of units.
     */
    public Page<Unit> getAllUnits(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // Create Pageable object for pagination.
        return unitRepository.findAll(pageable);  // Retrieve all units with pagination.
    }

    /**
     * Retrieves units by their occupancy status with pagination support.
     * 
     * @param isOccupied The occupancy status of the units (true or false).
     * @param page The page number to retrieve.
     * @param size The size (number of units per page).
     * @return A paginated list of units filtered by occupancy status.
     */
    public Page<Unit> getUnitsByOccupiedStatus(boolean isOccupied, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // Create Pageable object for pagination.
        return unitRepository.findByIsOccupied(isOccupied, pageable);  // Retrieve units based on occupancy status.
    }

    /**
     * Updates an existing unit with new details.
     * 
     * @param id The ID of the unit to update.
     * @param unitDetails The updated unit details.
     * @return The updated unit entity.
     * @throws UnitNotFoundException if no unit is found with the given ID.
     */
    public Unit updateUnit(Long id, Unit unitDetails) {
        Unit unit = getUnitById(id);  // Retrieve the unit to update (throws exception if not found).
        
        // Update the unit's fields with the new details.
        unit.setUnitNumber(unitDetails.getUnitNumber());
        unit.setRentAmount(unitDetails.getRentAmount());
        unit.setOccupied(unitDetails.isOccupied());
        unit.setProperty(unitDetails.getProperty());
        unit.setTenant(unitDetails.getTenant());

        return unitRepository.save(unit);  // Save and return the updated unit entity.
    }

    /**
     * Deletes a unit from the database.
     * 
     * @param id The ID of the unit to delete.
     * @throws UnitNotFoundException if no unit is found with the given ID.
     */
    public void deleteUnit(Long id) {
        Unit unit = getUnitById(id);  // Retrieve the unit to delete (throws exception if not found).
        unitRepository.delete(unit);  // Delete the unit from the repository.
    }

    /**
     * Checks if a unit is available (not occupied).
     * 
     * @param id The ID of the unit to check.
     * @return true if the unit is available (not occupied), false otherwise.
     * @throws UnitNotFoundException if no unit is found with the given ID.
     */
    public boolean isUnitAvailable(Long id) {
        Unit unit = getUnitById(id);  // Retrieve the unit to check (throws exception if not found).
        return !unit.isOccupied();  // Return true if the unit is not occupied.
    }

    /**
     * Calculates the rent due for a unit.
     * 
     * @param id The ID of the unit to calculate the rent for.
     * @return The rent amount due for the unit.
     * @throws UnitNotFoundException if no unit is found with the given ID.
     */
    public double calculateRentDue(Long id) {
        Unit unit = getUnitById(id);  // Retrieve the unit to calculate rent for (throws exception if not found).
        return unit.getRentAmount();  // Return the rent amount of the unit.
    }
}
