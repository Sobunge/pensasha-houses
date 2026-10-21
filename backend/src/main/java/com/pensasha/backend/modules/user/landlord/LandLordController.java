package com.pensasha.backend.modules.user.landlord;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.hateoas.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.landlord.dto.BankDetailsDTO;
import com.pensasha.backend.modules.user.landlord.dto.FinancialOverviewDTO;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.dto.LandlordStatsDTO;
import com.pensasha.backend.modules.user.landlord.dto.MaintenanceRequestDTO;
import com.pensasha.backend.modules.user.landlord.dto.PropertyPerformanceDTO;
import com.pensasha.backend.modules.user.landlord.dto.RecentPaymentDTO;
import com.pensasha.backend.modules.user.landlord.dto.TenantSummaryDTO;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/landlords")
@RequiredArgsConstructor
@Slf4j
public class LandLordController {

        private final LandLordService landlordService;

        // ---------------------- Get All Landlords ----------------------
        @GetMapping
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<PagedModel<EntityModel<GetLandLordDTO>>> getAllLandlords(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                log.info("API call: Get paginated landlords - page: {}, size: {}", page, size);
                Pageable pageable = PageRequest.of(page, size,
                                Sort.by((GetLandLordDTO getLandlordById) -> getLandlordById.getIdNumber()).ascending());

                Page<GetLandLordDTO> landlordPage = landlordService.getAllLandlords(pageable);

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
                                landlordPage.getTotalPages());

                return ResponseEntity.ok(PagedModel.of(landlordResources, metadata));
        }

        // ---------------------- Get Landlord by National ID ----------------------
        @GetMapping("/by-national-id/{idNumber}")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<EntityModel<GetLandLordDTO>> getLandlordById(@PathVariable String idNumber) {
                log.info("API call: Get landlord with ID: {}", idNumber);

                GetLandLordDTO landlordDTO = landlordService.getLandlordByIdNumber(idNumber);

                EntityModel<GetLandLordDTO> resource = EntityModel.of(landlordDTO,
                                linkTo(methodOn(LandLordController.class).getLandlordById(idNumber)).withSelfRel(),
                                linkTo(methodOn(LandLordController.class).getAllLandlords(0, 10))
                                                .withRel("all-landlords"));

                return ResponseEntity.ok(resource);
        }

        // ---------------------- Get landlord by ID ---------------------- //
        @GetMapping("/by-id/{userId}")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<EntityModel<GetLandLordDTO>> getLandlordById(@PathVariable Long userId) {
                log.info("API call: Get landlord with DB ID: {}", userId);

                GetLandLordDTO landlordDTO = landlordService.getLandlordByUserId(userId);

                EntityModel<GetLandLordDTO> resource = EntityModel.of(landlordDTO,
                                linkTo(methodOn(LandLordController.class).getLandlordById(userId)).withSelfRel(),
                                linkTo(methodOn(LandLordController.class).getAllLandlords(0, 10))
                                                .withRel("all-landlords"));

                return ResponseEntity.ok(resource);
        }

        // ---------------------- Update Landlord Properties ----------------------
        @PutMapping("/{userId}/properties")
        @PreAuthorize("hasAuthority('PROPERTY_UPDATE') or hasRole('ADMIN')")
        public ResponseEntity<EntityModel<GetLandLordDTO>> updateLandlordProperties(
                        @PathVariable Long userId,
                        @RequestBody Set<Property> properties) {

                log.info("API call: Update properties for landlord ID: {}", userId);

                GetLandLordDTO updatedLandlord = landlordService.updateLandlordProperties(userId, properties);

                EntityModel<GetLandLordDTO> resource = EntityModel.of(updatedLandlord,
                                linkTo(methodOn(LandLordController.class).getLandlordById(userId)).withSelfRel());

                return ResponseEntity.ok(resource);
        }

        // ---------------------- Delete Landlord ----------------------
        @DeleteMapping("/{userId}")
        @PreAuthorize("hasAuthority('LANDLORD_UPDATE_BANK') or hasRole('ADMIN')")
        public ResponseEntity<Void> deleteLandlord(@PathVariable Long userId) {
                log.info("API call: Delete landlord with DB ID: {}", userId);

                boolean deleted = landlordService.deleteLandlordProfile(userId);

                return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        }

        // ---------------------- Get Landlord Dashboard Stats ----------------------
        @GetMapping("/{userId}/stats")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<LandlordStatsDTO> getDashboardStats(@PathVariable Long userId) {
                log.info("API call: Get dashboard stats for landlord DB ID: {}", userId);

                LandlordStatsDTO stats = landlordService.getDashboardStats(userId);

                return ResponseEntity.ok(stats);
        }

        // ---------------------- Get Landlord Properties Performance ----------------------
        @GetMapping("/{userId}/properties/performance")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<List<PropertyPerformanceDTO>> getPropertiesPerformance(@PathVariable Long userId) {
                log.info("API call: Get properties performance metrics for landlord DB ID: {}", userId);

                List<PropertyPerformanceDTO> performanceList = landlordService.getPropertiesPerformance(userId);

                return ResponseEntity.ok(performanceList);
        }

        // ---------------------- Get Landlord Financial Overview ----------------------
        @GetMapping("/{userId}/financial-overview")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<FinancialOverviewDTO> getFinancialOverview(@PathVariable Long userId) {
                log.info("API call: Get financial overview for landlord DB ID: {}", userId);
                FinancialOverviewDTO overview = landlordService.getFinancialOverview(userId);
                return ResponseEntity.ok(overview);
        }

        // ---------------------- Get Recent Payments ----------------------
        @GetMapping("/{userId}/recent-payments")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<List<RecentPaymentDTO>> getRecentPayments(
                        @PathVariable Long userId,
                        @RequestParam(defaultValue = "5") int limit) {
                log.info("API call: Get recent payments for landlord DB ID: {}", userId);

                List<RecentPaymentDTO> recentPayments = landlordService.getRecentPayments(userId, limit);

                return ResponseEntity.ok(recentPayments);
        }

        // ---------------------- Get Maintenance Requests ----------------------
        @GetMapping("/{userId}/maintenance-requests")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<List<MaintenanceRequestDTO>> getMaintenanceRequests(
                        @PathVariable Long userId,
                        @RequestParam(defaultValue = "5") int limit) {
                log.info("API call: Get maintenance requests for landlord DB ID: {}", userId);

                List<MaintenanceRequestDTO> requests = landlordService.getMaintenanceRequests(userId, limit);

                return ResponseEntity.ok(requests);
        }

        // ---------------------- Get Tenant Summary ----------------------
        @GetMapping("/{userId}/tenant-summary")
        @PreAuthorize("hasAuthority('LANDLORD_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<TenantSummaryDTO> getTenantSummary(@PathVariable Long userId) {
                log.info("API call: Get tenant summary for landlord DB ID: {}", userId);
                TenantSummaryDTO summary = landlordService.getTenantSummary(userId);
                return ResponseEntity.ok(summary);
        }

        // ---------------------- Update Landlord Bank Details ----------------------
        @PutMapping("/{userId}/bank-details")
        @PreAuthorize("hasAuthority('PROPERTY_UPDATE') or #userId == principal.id or hasRole('ADMIN')")
        public ResponseEntity<EntityModel<GetLandLordDTO>> updateBankDetails(
                        @PathVariable Long userId,
                        @Valid @RequestBody BankDetailsDTO dto) {

                log.info("API call: Update bank details for landlord ID: {}", userId);

                BankDetails bankDetails = new BankDetails();
                bankDetails.setBankName(dto.getBankName());
                bankDetails.setAccountName(dto.getAccountName());
                bankDetails.setAccountNumber(dto.getAccountNumber());
                bankDetails.setBranchName(dto.getBranchName());

                GetLandLordDTO updatedLandlord = landlordService.updateLandlordBankDetails(userId, bankDetails);

                EntityModel<GetLandLordDTO> resource = EntityModel.of(updatedLandlord,
                                linkTo(methodOn(LandLordController.class).getLandlordById(userId)).withSelfRel());

                return ResponseEntity.ok(resource);
        }
}