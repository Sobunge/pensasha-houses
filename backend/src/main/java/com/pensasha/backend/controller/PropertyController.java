package com.pensasha.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.entity.Property;
import com.pensasha.backend.service.PropertyService;

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
        PropertyDTO responseDTO = new PropertyDTO(property);

        // Create HATEOAS links
        EntityModel<PropertyDTO> propertyModel = EntityModel.of(responseDTO,
                linkTo(methodOn(PropertyController.class).getProperty(property.getId())).withSelfRel(),
                linkTo(methodOn(PropertyController.class).getAllProperties()).withRel("all-properties"));

        return ResponseEntity.status(HttpStatus.CREATED).body(propertyModel);
    }

    // Update a property

    // Getting a property

    // Getting all properties

    // Getting all properties belonging to a landlord

    // Deleting a property

}
