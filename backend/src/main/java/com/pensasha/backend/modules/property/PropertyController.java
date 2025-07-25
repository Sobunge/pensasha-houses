package com.pensasha.backend.modules.property;

import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.property.mapper.PropertyMapper;
import com.pensasha.backend.utils.ValidationUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
@RequestMapping("/api/properties") // Base URL for property-related endpoints
@RequiredArgsConstructor // Automatically injects dependencies via constructor
public class PropertyController {

        private final PropertyService propertyService; // Service to handle property-related operations
        private final PropertyMapper propertyMapper;

        // Add a new property
        @PostMapping
        public ResponseEntity<?> addProperty(
                        @Valid @RequestBody PropertyDTO propertyDTO, // Validates the input PropertyDTO
                        BindingResult bindingResult, @RequestParam(value = "page", defaultValue = "0") int page,
                        @RequestParam(value = "size", defaultValue = "10") int size) { // Collects validation errors if
                                                                                       // any

                // If there are validation errors, return a 400 response with error details
                if (bindingResult.hasErrors()) {
                        return ResponseEntity.badRequest()
                                        .body(Map.of("errors", ValidationUtil.getValidationErrors(bindingResult)));
                }

                // Add the property via the service and map it to PropertyDTO
                Property property = propertyService.addProperty(propertyDTO);
                PropertyDTO responseDTO = propertyMapper.toDTO(property);

                // Create a HATEOAS response with links to the property and all properties
                EntityModel<PropertyDTO> propertyModel = EntityModel.of(responseDTO,
                                linkTo(methodOn(PropertyController.class).getProperty(property.getId())).withSelfRel(),
                                linkTo(methodOn(PropertyController.class).getAllProperties(page, size))
                                                .withRel("all-properties"));

                // Return 201 (Created) with the property details and links
                return ResponseEntity.status(HttpStatus.CREATED).body(propertyModel);
        }

        // Update an existing property
        @PutMapping("/{id}")
        public ResponseEntity<?> updateProperty(
                        @PathVariable Long id, // Property ID to update
                        @Valid @RequestBody PropertyDTO propertyDTO, // Validates the input PropertyDTO
                        BindingResult bindingResult, @RequestParam(value = "page", defaultValue = "0") int page,
                        @RequestParam(value = "size", defaultValue = "10") int size) { // Collects validation errors if
                                                                                       // any

                // If there are validation errors, return a 400 response with error details
                if (bindingResult.hasErrors()) {
                        return ResponseEntity.badRequest()
                                        .body(Map.of("errors", ValidationUtil.getValidationErrors(bindingResult)));
                }

                // Update the property using the service and map it to PropertyDTO
                Property updatedProperty = propertyService.updateProperty(id, propertyDTO);
                PropertyDTO updatedPropertyDTO = propertyMapper.toDTO(updatedProperty);

                // Create a HATEOAS response with links to the updated property and all
                // properties
                EntityModel<PropertyDTO> propertyModel = EntityModel.of(updatedPropertyDTO,
                                linkTo(methodOn(PropertyController.class).getProperty(id)).withSelfRel(),
                                linkTo(methodOn(PropertyController.class).getAllProperties(page, size))
                                                .withRel("all-properties"));

                // Return 200 (OK) with the updated property details and links
                return ResponseEntity.ok(propertyModel);
        }

        // Get a property by its ID
        @GetMapping("/{id}")
        public ResponseEntity<EntityModel<PropertyDTO>> getProperty(@PathVariable Long id) {
                // Fetch the property using the service
                return propertyService.getProperty(id)
                                .map(propertyDTO -> {
                                        // Map the property to PropertyDTO and create HATEOAS response with links
                                        EntityModel<PropertyDTO> responseDTO = EntityModel.of(propertyDTO,
                                                        linkTo(methodOn(PropertyController.class).getProperty(id))
                                                                        .withSelfRel(),
                                                        linkTo(methodOn(PropertyController.class).getAllProperties(0,
                                                                        10))
                                                                        .withRel("all-properties"));
                                        return ResponseEntity.ok(responseDTO);
                                })
                                .orElseGet(() -> ResponseEntity.notFound().build()); // Return 404 if property not found
        }

        // Get all properties
        @GetMapping
        public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getAllProperties(
                        @RequestParam(value = "page", defaultValue = "0") int page,
                        @RequestParam(value = "size", defaultValue = "10") int size) {

                // Fetch paginated properties from the service/repository
                Page<Property> propertyPage = propertyService.getAllProperties(PageRequest.of(page, size));

                // If no properties exist, return a 204 (No Content) response
                if (propertyPage.isEmpty()) {
                        return ResponseEntity.noContent().build();
                }

                // Map each property to PropertyDTO and create HATEOAS response with links
                List<EntityModel<PropertyDTO>> propertyDTOs = propertyPage.stream()
                                .map(property -> EntityModel.of(propertyMapper.toDTO(property),
                                                linkTo(methodOn(PropertyController.class).getProperty(property.getId()))
                                                                .withSelfRel(),
                                                linkTo(methodOn(PropertyController.class).getAllProperties(page, size))
                                                                .withRel("all-properties")))
                                .collect(Collectors.toList());

                // Create a HATEOAS response with a list of properties and a link to the
                // properties collection
                CollectionModel<EntityModel<PropertyDTO>> responseDTO = CollectionModel.of(propertyDTOs,
                                linkTo(methodOn(PropertyController.class).getAllProperties(page, size)).withSelfRel());

                // Add pagination links for next and previous pages if applicable
                if (propertyPage.hasNext()) {
                        responseDTO.add(linkTo(methodOn(PropertyController.class)
                                        .getAllProperties(page + 1, size)).withRel("next"));
                }
                if (propertyPage.hasPrevious()) {
                        responseDTO.add(linkTo(methodOn(PropertyController.class)
                                        .getAllProperties(page - 1, size)).withRel("previous"));
                }

                return ResponseEntity.ok(responseDTO); // Return 200 (OK) with properties list
        }

        // Gettting all properties of a landlord
        @GetMapping("/landlord/{idNumber}")
        public ResponseEntity<CollectionModel<EntityModel<PropertyDTO>>> getPropertiesByLandlord(
                        @PathVariable String idNumber, @PageableDefault(size = 10, sort = "id") Pageable pageable) {

                Page<Property> properties = propertyService.gettingPropertiesForLandlord(idNumber, pageable);

                if (properties.isEmpty()) {
                        return ResponseEntity.noContent().build();
                }

                List<EntityModel<PropertyDTO>> propertyDTOs = properties.getContent().stream()
                                .map(property -> EntityModel.of(propertyMapper.toDTO(property),
                                                linkTo(methodOn(PropertyController.class).getProperty(property.getId()))
                                                                .withSelfRel(),
                                                linkTo(methodOn(PropertyController.class).getAllProperties(0, 10))
                                                                .withRel("all-properties")))
                                .collect(Collectors.toList());

                CollectionModel<EntityModel<PropertyDTO>> responseDTO = CollectionModel.of(propertyDTOs,
                                linkTo(methodOn(PropertyController.class).getPropertiesByLandlord(idNumber, pageable))
                                                .withSelfRel());

                // Add pagination links for next and previous pages if applicable
                if (properties.hasNext()) {
                        Pageable nextPageable = properties.nextPageable();
                        responseDTO.add(linkTo(methodOn(PropertyController.class)
                                        .getPropertiesByLandlord(idNumber, nextPageable)).withRel("next"));
                }

                if (properties.hasPrevious()) {
                        Pageable prevPageable = properties.previousPageable();
                        responseDTO.add(linkTo(methodOn(PropertyController.class)
                                        .getPropertiesByLandlord(idNumber, prevPageable)).withRel("previous"));
                }

                return ResponseEntity.ok(responseDTO);
        }

        // Delete a property by ID
        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteProperty(@PathVariable Long id) {
                return propertyService.getProperty(id)
                                .map(propertyDTO -> {
                                        // Delete the property and return a 204 (No Content) response
                                        propertyService.deleteProperty(id);
                                        return ResponseEntity.noContent().build();
                                })
                                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                                                .body(Map.of("error", "Property not found"))); // Return 404 if property
                                                                                               // not found
        }
}
