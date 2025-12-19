package com.pensasha.backend.modules.unit;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * REST Controller for managing Unit entities.
 * Provides endpoints for CRUD operations, pagination, and custom queries.
 */
@RestController
@RequestMapping("/api/units")
@Slf4j
@AllArgsConstructor
public class UnitController {

    private final UnitService unitService;

    /**
     * Adds a new unit.
     */
    @PostMapping
    public ResponseEntity<Unit> addUnit(@RequestBody Unit unit) {
        log.info("Received request to add new unit.");
        Unit createdUnit = unitService.addUnit(unit);
        return new ResponseEntity<>(createdUnit, HttpStatus.CREATED);
    }

    /**
     * Retrieves a unit by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Unit> getUnitById(@PathVariable Long id) {
        log.info("Fetching unit with ID: {}", id);
        Unit unit = unitService.getUnitById(id);
        return ResponseEntity.ok(unit);
    }

    /**
     * Retrieves all units with pagination.
     */
    @GetMapping
    public ResponseEntity<Page<Unit>> getAllUnits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Fetching all units. Page: {}, Size: {}", page, size);
        Page<Unit> units = unitService.getAllUnits(page, size);
        return ResponseEntity.ok(units);
    }

    /**
     * Updates a unit by its ID.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Unit> updateUnit(@PathVariable Long id, @RequestBody Unit unitDetails) {
        log.info("Updating unit with ID: {}", id);
        Unit updatedUnit = unitService.updateUnit(id, unitDetails);
        return ResponseEntity.ok(updatedUnit);
    }

    /**
     * Deletes a unit by its ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Long id) {
        log.info("Deleting unit with ID: {}", id);
        unitService.deleteUnit(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Checks if a unit is available (not occupied).
     */
    @GetMapping("/{id}/availability")
    public ResponseEntity<Boolean> isUnitAvailable(@PathVariable Long id) {
        log.info("Checking availability for unit with ID: {}", id);
        boolean available = unitService.isUnitAvailable(id);
        return ResponseEntity.ok(available);
    }

    /**
     * Calculates the rent due for a unit.
     */
    @GetMapping("/{id}/rent-due")
    public ResponseEntity<BigDecimal> calculateRentDue(@PathVariable Long id) {
        log.info("Calculating rent due for unit with ID: {}", id);
        BigDecimal rentDue = unitService.calculateRentDue(id);
        return ResponseEntity.ok(rentDue);
    }


    /**
     * Retrieves all units associated with a specific tenant ID.
     */
    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<java.util.List<Unit>> getUnitsByTenantId(@PathVariable Long tenantId) {
        log.info("Fetching units for tenant with ID: {}", tenantId);
        List<Unit> units = unitService.getUnitsByTenantId(tenantId);
        return ResponseEntity.ok(units);
    }
}