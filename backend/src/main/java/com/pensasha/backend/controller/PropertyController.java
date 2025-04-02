package com.pensasha.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.pensasha.backend.entity.Property;
import com.pensasha.backend.service.PropertyService;
import com.pensasha.backend.utils.PropertyMapperUtil;
import com.pensasha.backend.dto.PropertyDTO;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/properties/")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    // Add a property
    @PostMapping("/add")
    public ResponseEntity<?> addProperty(
            @Valid @RequestBody PropertyDTO propertyDTO,
            BindingResult bindingResult) {

        // Handle validation errors
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        // Save the property
        Property property = propertyService.addProperty(propertyDTO);

        // Convert Property to PropertyDTO (if necessary)
        PropertyDTO responseDTO = PropertyMapperUtil.mapToDTO(property);

        // Create HATEOAS links
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
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        Property updatedProperty = propertyService.updateProperty(id, propertyDTO);

        // Use the utility method
        PropertyDTO updatedPropertyDTO = PropertyMapperUtil.mapToDTO(updatedProperty);

        EntityModel<PropertyDTO> propertyModel = EntityModel.of(updatedPropertyDTO,
                linkTo(methodOn(PropertyController.class).updateProperty(id, propertyDTO, bindingResult)).withSelfRel(),
                linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));

        return ResponseEntity.ok(propertyModel);
    }

    // Getting a property
    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<PropertyDTO>> getProperty(@PathVariable Long id) {
        Optional<PropertyDTO> propertyDTOOpt = propertyService.getProperty(id);

        if (propertyDTOOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // Returns 404 if property is not found
        }

        PropertyDTO propertyDTO = propertyDTOOpt.get();

        EntityModel<PropertyDTO> responseDTO = EntityModel.of(propertyDTO,
                linkTo(methodOn(PropertyController.class).getProperty(id)).withSelfRel(),
                linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));

        return ResponseEntity.ok(responseDTO);
    }

    // Getting all properties
    @GetMapping("/all")
    public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getAllProperties() {

        List<Property> properties = propertyService.getAllProperties(); // Fetch properties

        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no properties exist
        }

        // Convert to DTO and wrap in EntityModel
        List<EntityModel<PropertyDTO>> propertyDTOs = properties.stream()
                .map(property -> {
                    PropertyDTO dto = PropertyMapperUtil.mapToDTO(property);
                    return EntityModel.of(dto,
                            linkTo(methodOn(PropertyController.class).getProperty(property.getId())).withSelfRel(),
                            linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));
                })
                .collect(Collectors.toList());

        // Wrap in CollectionModel
        CollectionModel<EntityModel<PropertyDTO>> responseDTO = CollectionModel.of(propertyDTOs,
                linkTo(methodOn(PropertyController.class).getAllProperties()).withSelfRel());

        return ResponseEntity.ok(responseDTO);
    }

    // Getting all properties belonging to a landlord
    @GetMapping("/all/{idNumber}")
    public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getPropertiesByLandlord(
            @PathVariable String idNumber) {

        List<Property> properties = propertyService.gettingPropertiesForLandlord(idNumber);

        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no properties exist for the landlord
        }

        List<EntityModel<PropertyDTO>> propertyDTOs = properties.stream()
                .map(property -> {
                    PropertyDTO propertyDTO = PropertyMapperUtil.mapToDTO(property);
                    return EntityModel.of(propertyDTO,
                            linkTo(methodOn(PropertyController.class).getProperty(property.getId())).withSelfRel(),
                            linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));
                })
                .collect(Collectors.toList());

        CollectionModel<EntityModel<PropertyDTO>> responseDTO = CollectionModel.of(propertyDTOs,
                linkTo(methodOn(PropertyController.class).getPropertiesByLandlord(idNumber)).withSelfRel());

        return ResponseEntity.ok(responseDTO);
    }

    // Deleting a property
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id) {

        Optional<PropertyDTO> propertyOpt = propertyService.getProperty(id);

        if (propertyOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Property not found"));
        }

        propertyService.deleteProperty(id);

        return ResponseEntity.noContent().build(); // 204 No Content (successful deletion)
    }

}
