package com.pensasha.backend.modules.property;

import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.property.dto.createPropertyDTO;
import com.pensasha.backend.utils.ValidationUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    @PreAuthorize("hasAuthority('PROPERTY_CREATE') or hasRole('ADMIN')")
    public ResponseEntity<?> addProperty(@Valid @RequestBody createPropertyDTO createDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("errors", ValidationUtil.getValidationErrors(bindingResult)));
        }

        PropertyDTO responseDTO = propertyService.addProperty(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(toModel(responseDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('PROPERTY_UPDATE') or hasRole('ADMIN')")
    public ResponseEntity<?> updateProperty(@PathVariable Long id, @Valid @RequestBody PropertyDTO propertyDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("errors", ValidationUtil.getValidationErrors(bindingResult)));
        }

        PropertyDTO updated = propertyService.updateProperty(id, propertyDTO);
        return ResponseEntity.ok(toModel(updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('PROPERTY_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<EntityModel<PropertyDTO>> getProperty(@PathVariable Long id) {
        PropertyDTO dto = propertyService.getProperty(id);
        return ResponseEntity.ok(toModel(dto));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('PROPERTY_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getAllProperties(
            @PageableDefault(size = 10) Pageable pageable) {

        Page<PropertyDTO> propertyPage = propertyService.getAllProperties(pageable);

        if (propertyPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Explicitly type the list to help the compiler infer types for CollectionModel
        List<EntityModel<PropertyDTO>> propertyModels = propertyPage.getContent().stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        CollectionModel<EntityModel<PropertyDTO>> collectionModel = CollectionModel.of(propertyModels,
                linkTo(methodOn(PropertyController.class).getAllProperties(pageable)).withSelfRel());

        return ResponseEntity.ok(collectionModel);
    }

    @GetMapping("/landlord/{id}")
    @PreAuthorize("hasAuthority('PROPERTY_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getPropertiesByLandlord(
            @PathVariable Long id, @PageableDefault(size = 10) Pageable pageable) {

        Page<PropertyDTO> properties = propertyService.getPropertiesForLandlord(id, pageable);

        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<EntityModel<PropertyDTO>> propertyModels = properties.getContent().stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return ResponseEntity.ok(CollectionModel.of(propertyModels,
                linkTo(methodOn(PropertyController.class).getPropertiesByLandlord(id, pageable)).withSelfRel()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PROPERTY_DELETE') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Helper method to wrap DTO into EntityModel with HATEOAS links.
     * This avoids repeating link logic and solves type inference issues.
     */
    private EntityModel<PropertyDTO> toModel(PropertyDTO dto) {
        return EntityModel.of(dto,
                linkTo(methodOn(PropertyController.class).getProperty(dto.getId())).withSelfRel(),
                linkTo(methodOn(PropertyController.class).getAllProperties(null)).withRel("all-properties"));
    }
}