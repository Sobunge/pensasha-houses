package com.pensasha.backend.modules.user.landlord;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.hateoas.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pensasha.backend.modules.user.landlord.dto.LandLordDTO;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/landlords")
@RequiredArgsConstructor
@Slf4j
public class LandLordController {

    private final LandLordService landLordService;

    /**
     * Retrieve a paginated list of all landlords, with HATEOAS links.
     *
     * @param page page number
     * @param size number of items per page
     * @return paginated landlords list with hypermedia links
     */
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<LandLordDTO>>> getAllLandlords(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        log.info("API call: Get paginated landlords - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by("idNumber").ascending());

        Page<LandLordDTO> landlordPage = landLordService.getAllLandlords(pageable);

        // Convert each LandLordDTO to an EntityModel with a self link
        List<EntityModel<LandLordDTO>> landlordResources = landlordPage.getContent().stream()
                .map(landlordDTO -> EntityModel.of(landlordDTO,
                        linkTo(methodOn(LandLordController.class)
                                .getLandlordById(landlordDTO.getIdNumber()))
                                .withSelfRel()))
                .collect(Collectors.toList());

        // Build pagination metadata
        PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(
                landlordPage.getSize(),
                landlordPage.getNumber(),
                landlordPage.getTotalElements(),
                landlordPage.getTotalPages());

        // Assemble final paged model
        PagedModel<EntityModel<LandLordDTO>> pagedModel = PagedModel.of(landlordResources, metadata);

        return ResponseEntity.ok(pagedModel);
    }

    /**
     * Retrieve a specific landlord by National ID.
     *
     * @param idNumber National ID of the landlord
     * @return LandLordDTO wrapped in HATEOAS EntityModel
     */
    @GetMapping("/{idNumber}")
    public ResponseEntity<EntityModel<LandLordDTO>> getLandlordById(@PathVariable String idNumber) {
        log.info("API call: Get landlord with ID: {}", idNumber);

        LandLordDTO landlordDTO = landLordService.getLandlordById(idNumber);

        EntityModel<LandLordDTO> landlordResource = EntityModel.of(landlordDTO,
                linkTo(methodOn(LandLordController.class).getLandlordById(idNumber)).withSelfRel(),
                linkTo(methodOn(LandLordController.class).getAllLandlords(0, 10)).withRel("all-landlords"));

        return ResponseEntity.ok(landlordResource);
    }

    /**
     * Update landlord's associated properties.
     *
     * @param idNumber   National ID of the landlord
     * @param properties set of new properties
     * @return updated LandLordDTO wrapped in HATEOAS EntityModel
     */
    @PutMapping("/{idNumber}/properties")
    public ResponseEntity<EntityModel<LandLordDTO>> updateLandlordProperties(
            @PathVariable String idNumber,
            @RequestBody Set<com.pensasha.backend.modules.property.Property> properties) {

        log.info("API call: Update properties for landlord ID: {}", idNumber);

        LandLordDTO updatedLandlord = landLordService.updateLandlordProperties(idNumber, properties);

        EntityModel<LandLordDTO> landlordResource = EntityModel.of(updatedLandlord,
                linkTo(methodOn(LandLordController.class).getLandlordById(idNumber)).withSelfRel());

        return ResponseEntity.ok(landlordResource);
    }

    /**
     * Delete a landlord by database ID.
     *
     * @param id database ID of landlord
     * @return HTTP 204 No Content if successful, or 404 if not found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLandlord(@PathVariable Long id) {
        log.info("API call: Delete landlord with DB ID: {}", id);

        boolean deleted = landLordService.deleteLandlord(id);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}