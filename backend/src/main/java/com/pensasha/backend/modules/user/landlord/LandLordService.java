package com.pensasha.backend.modules.user.landlord;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.invoice.InvoiceRepository;
import com.pensasha.backend.modules.lease.LeaseRepository;
import com.pensasha.backend.modules.maintenance.MaintenanceRequest;
import com.pensasha.backend.modules.maintenance.MaintenanceRequestRepository;
import com.pensasha.backend.modules.payment.Payment;
import com.pensasha.backend.modules.payment.PaymentRepository;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.landlord.dto.FinancialOverviewDTO;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.dto.LandlordStatsDTO;
import com.pensasha.backend.modules.user.landlord.dto.MaintenanceRequestDTO;
import com.pensasha.backend.modules.user.landlord.dto.PaymentPreferencesDTO;
import com.pensasha.backend.modules.user.landlord.dto.PropertyPerformanceDTO;
import com.pensasha.backend.modules.user.landlord.dto.RecentPaymentDTO;
import com.pensasha.backend.modules.user.landlord.dto.TenantSummaryDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LandLordService {

        private final LandlordProfileRepository landlordProfileRepository;
        private final BankDetailsRepository bankDetailsRepository;
        private final UserRepository userRepository;
        private final InvoiceRepository invoiceRepository;
        private final LandlordMapper landlordMapper;
        private final PaymentRepository paymentRepository;
        private final MaintenanceRequestRepository maintenanceRequestRepository;
        private final LeaseRepository leaseRepository;

        /* ===================== FETCH BY USER ID ===================== */
        @Transactional(readOnly = true)
        public GetLandLordDTO getLandlordByUserId(Long userId) {
                log.info("Fetching landlord profile for userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                return landlordMapper.toGetDTO(profile);
        }

        /* ===================== FETCH BY ID NUMBER ===================== */
        public GetLandLordDTO getLandlordByIdNumber(String idNumber) {
                log.info("Fetching landlord profile by user idNumber={}", idNumber);

                User user = userRepository.findByIdNumber(idNumber)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found with idNumber: " + idNumber));

                if (user.getRoles() == null || user.getRoles().stream()
                                .noneMatch(r -> "LANDLORD".equalsIgnoreCase(r.getName()))) {
                        throw new IllegalStateException("User is not a landlord");
                }

                LandlordProfile profile = landlordProfileRepository.findById(user.getId())
                                .orElseThrow(
                                                () -> new ResourceNotFoundException(
                                                                "Landlord profile not found for userId: "
                                                                                + user.getId()));

                return landlordMapper.toGetDTO(profile);
        }

        /* ===================== FETCH ALL LANDLORDS ===================== */
        public Page<GetLandLordDTO> getAllLandlords(Pageable pageable) {
                log.info("Fetching all landlord profiles with pagination");

                return landlordProfileRepository
                                .findAll(pageable)
                                .map(landlordMapper::toGetDTO);
        }

        /* ===================== DELETE LANDLORD PROFILE ===================== */
        public boolean deleteLandlordProfile(Long userId) {
                log.info("Deleting landlord profile for userId={}", userId);

                if (!landlordProfileRepository.existsById(userId)) {
                        log.warn("Landlord profile not found for userId={}", userId);
                        return false;
                }

                landlordProfileRepository.deleteById(userId);
                log.info("Landlord profile deleted for userId={}", userId);
                return true;
        }

        /* ===================== UPDATE PROPERTIES ===================== */
        public GetLandLordDTO updateLandlordProperties(Long userId, Set<Property> properties) {
                log.info("Updating properties for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                profile.setProperties(properties);
                return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
        }

        /* ===================== UPDATE / ADD BANK DETAILS ===================== */
        @Transactional
        public GetLandLordDTO updateLandlordBankDetails(Long userId, BankDetails bankDetails) {
                log.info("Adding/Updating bank details for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                // If bankDetails has an ID, check if it exists in the collection to update it;
                // otherwise add as new.
                if (bankDetails.getId() != null) {
                        BankDetails existing = profile.getBankDetails().stream()
                                        .filter(b -> b.getId().equals(bankDetails.getId()))
                                        .findFirst()
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                        "Bank details record with ID " + bankDetails.getId()
                                                                        + " not found for landlord"));

                        existing.setBankName(bankDetails.getBankName());
                        existing.setAccountName(bankDetails.getAccountName());
                        existing.setAccountNumber(bankDetails.getAccountNumber());
                        existing.setBranchName(bankDetails.getBranchName());
                } else {
                        profile.addBankDetails(bankDetails);
                }

                return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
        }

        /* ===================== DASHBOARD STATS ===================== */
        public LandlordStatsDTO getDashboardStats(Long userId) {
                log.info("Calculating dashboard stats for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                Set<Property> properties = profile.getProperties();
                long propertyCount = properties != null ? properties.size() : 0;

                List<Unit> allUnits = properties == null ? List.of()
                                : properties.stream()
                                                .filter(property -> property.getUnits() != null)
                                                .flatMap(property -> property.getUnits().stream())
                                                .collect(Collectors.toList());

                long totalUnits = allUnits.size();

                long occupiedUnits = allUnits.stream()
                                .filter(unit -> unit.getTenant() != null ||
                                                (unit.getStatus() != null && "OCCUPIED"
                                                                .equalsIgnoreCase(unit.getStatus().name())))
                                .count();

                int occupancyRate = (totalUnits > 0)
                                ? (int) Math.round(((double) occupiedUnits / totalUnits) * 100)
                                : 0;

                BigDecimal pendingRent = invoiceRepository.sumPendingOrOverdueRentByLandlordId(userId);
                if (pendingRent == null) {
                        pendingRent = BigDecimal.ZERO;
                }

                return new LandlordStatsDTO(
                                occupancyRate,
                                occupiedUnits,
                                totalUnits,
                                totalUnits,
                                propertyCount,
                                pendingRent);
        }

        public List<PropertyPerformanceDTO> getPropertiesPerformance(Long userId) {
                log.info("Calculating property performance metrics for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                Set<Property> properties = profile.getProperties();
                if (properties == null || properties.isEmpty()) {
                        return List.of();
                }

                return properties.stream().map(property -> {
                        Long propId = property.getId();
                        String name = property.getName();

                        Set<Unit> unitsSet = property.getUnits();
                        int totalUnits = unitsSet != null ? unitsSet.size() : 0;

                        long occupiedUnits = unitsSet == null ? 0
                                        : unitsSet.stream()
                                                        .filter(unit -> unit.getTenant() != null ||
                                                                        (unit.getStatus() != null && "OCCUPIED"
                                                                                        .equalsIgnoreCase(unit
                                                                                                        .getStatus()
                                                                                                        .name())))
                                                        .count();

                        BigDecimal revenue = invoiceRepository.sumPaidRevenueByPropertyId(propId);
                        if (revenue == null) {
                                revenue = BigDecimal.ZERO;
                        }

                        return new PropertyPerformanceDTO(propId, name, totalUnits, occupiedUnits, revenue);
                }).collect(Collectors.toList());
        }

        public FinancialOverviewDTO getFinancialOverview(Long userId) {
                log.info("Calculating financial overview for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                int propertyCount = profile.getProperties() != null ? profile.getProperties().size() : 0;
                log.debug("Found {} properties for landlord userId={}", propertyCount, userId);

                BigDecimal totalIncome = invoiceRepository.sumPaidRevenueByLandlordId(userId);
                if (totalIncome == null) {
                        totalIncome = BigDecimal.ZERO;
                }

                BigDecimal totalExpenses = BigDecimal.ZERO;
                BigDecimal netProfit = totalIncome.subtract(totalExpenses);

                List<FinancialOverviewDTO.MonthlyDataPoint> monthlyData = List.of(
                                new FinancialOverviewDTO.MonthlyDataPoint("Jan", new BigDecimal("45000"),
                                                new BigDecimal("15000")),
                                new FinancialOverviewDTO.MonthlyDataPoint("Feb", new BigDecimal("52000"),
                                                new BigDecimal("18000")),
                                new FinancialOverviewDTO.MonthlyDataPoint("Mar", new BigDecimal("78000"),
                                                new BigDecimal("25000")),
                                new FinancialOverviewDTO.MonthlyDataPoint("Apr", new BigDecimal("70000"),
                                                new BigDecimal("20000")),
                                new FinancialOverviewDTO.MonthlyDataPoint("May", new BigDecimal("95000"),
                                                new BigDecimal("30000")),
                                new FinancialOverviewDTO.MonthlyDataPoint("Jun", new BigDecimal("110000"),
                                                new BigDecimal("32000")),
                                new FinancialOverviewDTO.MonthlyDataPoint("Jul", new BigDecimal("105000"),
                                                new BigDecimal("28000")),
                                new FinancialOverviewDTO.MonthlyDataPoint("Aug", totalIncome, totalExpenses));

                return new FinancialOverviewDTO(monthlyData, totalIncome, totalExpenses, netProfit);
        }

        public List<RecentPaymentDTO> getRecentPayments(Long userId, int limit) {
                log.info("Fetching recent payments for landlord userId={}, limit={}", userId, limit);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                Pageable pageable = PageRequest.of(0, limit);
                List<Payment> payments = paymentRepository.findRecentPaymentsByLandlordId(userId, pageable);

                return payments.stream().map(payment -> {
                        String tenantName = payment.getTenant() != null && payment.getTenant().getUser() != null
                                        ? payment.getTenant().getUser().getFirstName() + " "
                                                        + payment.getTenant().getUser().getLastName()
                                        : "Unknown Tenant";

                        String unitName = (payment.getInvoice() != null &&
                                        payment.getInvoice().getLease() != null &&
                                        payment.getInvoice().getLease().getUnit() != null)
                                                        ? payment.getInvoice().getLease().getUnit().getUnitNumber()
                                                        : "N/A";

                        BigDecimal amount = payment.getAmount() != null
                                        ? payment.getAmount()
                                        : BigDecimal.ZERO;

                        String method = payment.getMethod() != null ? payment.getMethod().name() : "Other";

                        LocalDate paymentDate = payment.getPaymentDate() != null
                                        ? payment.getPaymentDate().toLocalDate()
                                        : null;

                        return new RecentPaymentDTO(
                                        payment.getId(),
                                        paymentDate,
                                        tenantName,
                                        unitName,
                                        amount,
                                        method);
                }).collect(Collectors.toList());
        }

        public List<MaintenanceRequestDTO> getMaintenanceRequests(Long userId, int limit) {
                log.info("Fetching maintenance requests for landlord userId={}, limit={}", userId, limit);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                Pageable pageable = PageRequest.of(0, limit);
                List<MaintenanceRequest> requests = maintenanceRequestRepository.findRecentByLandlordId(userId,
                                pageable);

                return requests.stream().map(req -> {
                        String unitName = req.getUnit() != null ? req.getUnit().getUnitNumber() : "N/A";
                        String status = req.getStatus() != null ? req.getStatus().name() : "PENDING";
                        String urgency = req.getPriority() != null ? req.getPriority().name() : "MEDIUM";
                        String issue = req.getDescription() != null ? req.getDescription() : "Maintenance";

                        return new MaintenanceRequestDTO(
                                        req.getId(),
                                        status,
                                        unitName,
                                        issue,
                                        urgency);
                }).collect(Collectors.toList());
        }

        public TenantSummaryDTO getTenantSummary(Long userId) {
                log.info("Calculating tenant & lease summary metrics for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                long activeTenants = leaseRepository.countActiveTenantsByLandlordId(userId);
                long expiringLeases = leaseRepository.countExpiringLeasesByLandlordId(userId,
                                LocalDate.now().plusDays(30));
                long pendingNotices = 0;

                return new TenantSummaryDTO(activeTenants, expiringLeases, pendingNotices);
        }

        @Transactional
        public GetLandLordDTO updatePaymentPreferences(Long userId, PaymentPreferencesDTO dto) {
                log.info("Updating payment preferences for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                if (dto.getAcceptedPaymentMethods() != null) {
                        profile.setAcceptedPaymentMethods(dto.getAcceptedPaymentMethods());
                }
                profile.setMpesaPaybillNumber(dto.getMpesaPaybillNumber());
                profile.setMpesaAccountNumber(dto.getMpesaAccountNumber());
                profile.setMpesaTillNumber(dto.getMpesaTillNumber());
                profile.setMpesaPhoneNumber(dto.getMpesaPhoneNumber());
                profile.setCashPaymentInstructions(dto.getCashPaymentInstructions());

                LandlordProfile savedProfile = landlordProfileRepository.save(profile);

                return landlordMapper.toGetDTO(savedProfile);
        }

        @Transactional
        public GetLandLordDTO deleteLandlordBankDetail(Long userId, Long bankId) {
                log.info("Deleting bank detail ID: {} for landlord user ID: {}", bankId, userId);

                // 1. Find the landlord profile
                LandlordProfile landlordProfile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found with ID: " + userId));

                // 2. Find the bank detail
                BankDetails bankDetails = bankDetailsRepository.findById(bankId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Bank detail not found with ID: " + bankId));

                // 3. Verify ownership
                if (!bankDetails.getLandlordProfile().getId().equals(landlordProfile.getId())) {
                        throw new IllegalArgumentException("Bank detail does not belong to this landlord");
                }

                // 4. Use the helper method on LandlordProfile to trigger orphanRemoval = true
                landlordProfile.removeBankDetails(bankDetails);

                // 5. Save and flush the profile to execute the SQL DELETE immediately
                landlordProfileRepository.save(landlordProfile);
                landlordProfileRepository.flush();

                // 6. Return the updated DTO representation
                return getLandlordByUserId(userId);
        }
}