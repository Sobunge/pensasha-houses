package com.pensasha.backend.modules.user.landlord;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.hateoas.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;

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

    // ---------------------- Get All Landlords ----------------------
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<GetLandLordDTO>>> getAllLandlords(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        log.info("API call: Get paginated landlords - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by("idNumber").ascending());

        Page<GetLandLordDTO> landlordPage = landLordService.getAllLandlords(pageable);

        // Convert each DTO to an EntityModel with HATEOAS self-link
        List<EntityModel<GetLandLordDTO>> landlordResources = landlordPage.getContent().stream()
                .map(dto -> EntityModel.of(dto,
                        linkTo(methodOn(LandLordController.class)
                                .getLandlordById(dto.getIdNumber()))
                                .withSelfRel()))
                .collect(Collectors.toList());

        PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(
                landlordPage.getSize(),
                landlordPage.getNumber(),
                landlordPage.getTotalElements(),
                landlordPage.getTotalPages()
        );

        return ResponseEntity.ok(PagedModel.of(landlordResources, metadata));
    }

    // ---------------------- Get Landlord by National ID ----------------------
    @GetMapping("/by-national-id/{idNumber}")
    public ResponseEntity<EntityModel<GetLandLordDTO>> getLandlordById(@PathVariable String idNumber) {
        log.info("API call: Get landlord with ID: {}", idNumber);

        GetLandLordDTO landlordDTO = landLordService.getLandlordByIdNumber(idNumber);

        EntityModel<GetLandLordDTO> resource = EntityModel.of(landlordDTO,
                linkTo(methodOn(LandLordController.class).getLandlordById(idNumber)).withSelfRel(),
                linkTo(methodOn(LandLordController.class).getAllLandlords(0, 10)).withRel("all-landlords")
        );

        return ResponseEntity.ok(resource);
    }

    // ---------------------- Get landlord by ID ---------------------- //
    @GetMapping("/by-id/{id}")
    public ResponseEntity<EntityModel<GetLandLordDTO>> getLandlordById(@PathVariable Long id) {
        log.info("API call: Get landlord with DB ID: {}", id);

        GetLandLordDTO landlordDTO = landLordService.getLandLordById(id);

        EntityModel<GetLandLordDTO> resource = EntityModel.of(landlordDTO,
                linkTo(methodOn(LandLordController.class).getLandlordById(id)).withSelfRel(),
                linkTo(methodOn(LandLordController.class).getAllLandlords(0, 10)).withRel("all-landlords")
        );

        return ResponseEntity.ok(resource);
    }

    // ---------------------- Update Landlord Properties ----------------------
    @PutMapping("/{idNumber}/properties")
    public ResponseEntity<EntityModel<GetLandLordDTO>> updateLandlordProperties(
            @PathVariable String idNumber,
            @RequestBody Set<Property> properties) {

        log.info("API call: Update properties for landlord ID: {}", idNumber);

        GetLandLordDTO updatedLandlord = landLordService.updateLandlordProperties(idNumber, properties);

        EntityModel<GetLandLordDTO> resource = EntityModel.of(updatedLandlord,
                linkTo(methodOn(LandLordController.class).getLandlordById(idNumber)).withSelfRel()
        );

        return ResponseEntity.ok(resource);
    }

    // ---------------------- Update Landlord Bank Details ----------------------
    @PutMapping("/{idNumber}/bank-details")
    public ResponseEntity<EntityModel<GetLandLordDTO>> updateBankDetails(
            @PathVariable String idNumber,
            @RequestBody BankDetails bankDetails) {

        log.info("API call: Update bank details for landlord ID: {}", idNumber);

        GetLandLordDTO updatedLandlord = landLordService.updateLandlordBankDetails(idNumber, bankDetails);

        EntityModel<GetLandLordDTO> resource = EntityModel.of(updatedLandlord,
                linkTo(methodOn(LandLordController.class).getLandlordById(idNumber)).withSelfRel()
        );

        return ResponseEntity.ok(resource);
    }

    // ---------------------- Delete Landlord ----------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLandlord(@PathVariable Long id) {
        log.info("API call: Delete landlord with DB ID: {}", id);

        boolean deleted = landLordService.deleteLandlord(id);

        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
