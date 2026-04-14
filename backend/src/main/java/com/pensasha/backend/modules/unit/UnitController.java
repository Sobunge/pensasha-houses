package com.pensasha.backend.modules.unit;

import com.pensasha.backend.modules.unit.dto.UnitDTO;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/units")
@AllArgsConstructor
public class UnitController {

    private final UnitService unitService;

    @PostMapping
    @PreAuthorize("hasAuthority('PROPERTY_CREATE') or hasRole('ADMIN')")
    public ResponseEntity<UnitDTO> addUnit(@Valid @RequestBody UnitDTO unitDto) {
        return new ResponseEntity<>(unitService.addUnit(unitDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('PROPERTY_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<UnitDTO> getUnitById(@PathVariable Long id) {
        return ResponseEntity.ok(unitService.getUnitById(id));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('PROPERTY_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<Page<UnitDTO>> getAllUnits(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(unitService.getAllUnits(pageable));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('PROPERTY_UPDATE') or hasRole('ADMIN')")
    public ResponseEntity<UnitDTO> updateUnit(@PathVariable Long id, @Valid @RequestBody UnitDTO unitDto) {
        return ResponseEntity.ok(unitService.updateUnit(id, unitDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PROPERTY_DELETE') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUnit(@PathVariable Long id) {
        unitService.deleteUnit(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<UnitDTO>> getUnitsByProperty(@PathVariable Long propertyId) {
        return ResponseEntity.ok(unitService.getUnitsByProperty(propertyId));
    }
}