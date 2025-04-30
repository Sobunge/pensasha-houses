package com.pensasha.backend.controller;

import com.pensasha.backend.dto.PropertyDTO;
import com.pensasha.backend.entity.Property;
import com.pensasha.backend.service.PropertyService;
import com.pensasha.backend.utils.PropertyMapperUtil;
import com.pensasha.backend.utils.ValidationUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // Add a property
    @PostMapping
    public ResponseEntity<?> addProperty(
            @Valid @RequestBody PropertyDTO propertyDTO,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("errors", ValidationUtil.getValidationErrors(bindingResult)));
        }

        Property property = propertyService.addProperty(propertyDTO);
        PropertyDTO responseDTO = PropertyMapperUtil.mapToDTO(property);

        EntityModel<PropertyDTO> propertyModel = EntityModel.of(responseDTO,
                linkTo(methodOn(PropertyController.class).getProperty(property.getId())).withSelfRel(),
                linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));

        return ResponseEntity.status(HttpStatus.CREATED).body(propertyModel);
    }

    // Update a property
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyDTO propertyDTO,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("errors", ValidationUtil.getValidationErrors(bindingResult)));
        }

        Property updatedProperty = propertyService.updateProperty(id, propertyDTO);
        PropertyDTO updatedPropertyDTO = PropertyMapperUtil.mapToDTO(updatedProperty);

        EntityModel<PropertyDTO> propertyModel = EntityModel.of(updatedPropertyDTO,
                linkTo(methodOn(PropertyController.class).getProperty(id)).withSelfRel(),
                linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));

        return ResponseEntity.ok(propertyModel);
    }

    // Get a property by id
    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<PropertyDTO>> getProperty(@PathVariable Long id) {
        return propertyService.getProperty(id)
                .map(propertyDTO -> {
                    EntityModel<PropertyDTO> responseDTO = EntityModel.of(propertyDTO,
                            linkTo(methodOn(PropertyController.class).getProperty(id)).withSelfRel(),
                            linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));
                    return ResponseEntity.ok(responseDTO);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all properties
    @GetMapping
    public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();

        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<EntityModel<PropertyDTO>> propertyDTOs = properties.stream()
                .map(property -> EntityModel.of(PropertyMapperUtil.mapToDTO(property),
                        linkTo(methodOn(PropertyController.class).getProperty(property.getId())).withSelfRel(),
                        linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties")))
                .collect(Collectors.toList());

        CollectionModel<EntityModel<PropertyDTO>> responseDTO = CollectionModel.of(propertyDTOs,
                linkTo(methodOn(PropertyController.class).getAllProperties()).withSelfRel());

        return ResponseEntity.ok(responseDTO);
    }

    // Get properties by landlord ID number
    @GetMapping("/landlord/{idNumber}")
    public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getPropertiesByLandlord(
            @PathVariable String idNumber) {

        List<Property> properties = propertyService.gettingPropertiesForLandlord(idNumber);

        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<EntityModel<PropertyDTO>> propertyDTOs = properties.stream()
                .map(property -> EntityModel.of(PropertyMapperUtil.mapToDTO(property),
                        linkTo(methodOn(PropertyController.class).getProperty(property.getId())).withSelfRel(),
                        linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties")))
                .collect(Collectors.toList());

        CollectionModel<EntityModel<PropertyDTO>> responseDTO = CollectionModel.of(propertyDTOs,
                linkTo(methodOn(PropertyController.class).getPropertiesByLandlord(idNumber)).withSelfRel());

        return ResponseEntity.ok(responseDTO);
    }

    // Delete a property
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id) {
        return propertyService.getProperty(id)
                .map(propertyDTO -> {
                    propertyService.deleteProperty(id);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Property not found")));
    }
}