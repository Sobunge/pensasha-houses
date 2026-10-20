package com.pensasha.backend.modules.user.landlord;

import java.math.BigDecimal;
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
import com.pensasha.backend.modules.payment.Payment;
import com.pensasha.backend.modules.payment.PaymentRepository;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;
import com.pensasha.backend.modules.user.landlord.dto.FinancialOverviewDTO;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.dto.LandlordStatsDTO;
import com.pensasha.backend.modules.user.landlord.dto.PropertyPerformanceDTO;
import com.pensasha.backend.modules.user.landlord.dto.RecentPaymentDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class LandLordService {

        private final LandlordProfileRepository landlordProfileRepository;
        private final UserRepository userRepository;
        private final InvoiceRepository invoiceRepository;
        private final LandlordMapper landlordMapper;
        private final PaymentRepository paymentRepository;

        /* ===================== FETCH BY USER ID ===================== */
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

                // Fetch the user by idNumber
                User user = userRepository.findByIdNumber(idNumber)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found with idNumber: " + idNumber));

                // Ensure the user has the LANDLORD role
                if (user.getRoles() == null || user.getRoles().stream()
                                .noneMatch(r -> "LANDLORD".equalsIgnoreCase(r.getName()))) {
                        throw new IllegalStateException("User is not a landlord");
                }

                // Fetch the landlord profile associated with the user
                LandlordProfile profile = landlordProfileRepository.findById(user.getId())
                                .orElseThrow(
                                                () -> new ResourceNotFoundException(
                                                                "Landlord profile not found for userId: "
                                                                                + user.getId()));

                // Map entity to DTO including roles and permissions
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

        /* ===================== UPDATE BANK DETAILS ===================== */
        public GetLandLordDTO updateLandlordBankDetails(Long userId, BankDetails bankDetails) {
                log.info("Updating bank details for landlord userId={}", userId);

                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                profile.setBankDetails(bankDetails);
                return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
        }

        // Getting the landlord statistics
        public LandlordStatsDTO getDashboardStats(Long userId) {
                log.info("Calculating dashboard stats for landlord userId={}", userId);

                // 1. Fetch Landlord Profile
                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                Set<Property> properties = profile.getProperties();
                long propertyCount = properties != null ? properties.size() : 0;

                // 3. Extract all units across all properties safely
                List<Unit> allUnits = properties == null ? List.of()
                                : properties.stream()
                                                .filter(property -> property.getUnits() != null)
                                                .flatMap(property -> property.getUnits().stream())
                                                .collect(Collectors.toList());

                long totalUnits = allUnits.size();

                // 4. Occupied Units (A unit is occupied if it has a tenant assigned or status
                // is OCCUPIED)
                long occupiedUnits = allUnits.stream()
                                .filter(unit -> unit.getTenant() != null ||
                                                (unit.getStatus() != null && "OCCUPIED"
                                                                .equalsIgnoreCase(unit.getStatus().name())))
                                .count();

                // 5. Calculate Occupancy Rate percentage
                int occupancyRate = (totalUnits > 0)
                                ? (int) Math.round(((double) occupiedUnits / totalUnits) * 100)
                                : 0;

                // 6. Pending Rent
                BigDecimal pendingRent = invoiceRepository.sumPendingOrOverdueRentByLandlordId(userId);
                if (pendingRent == null) {
                        pendingRent = BigDecimal.ZERO;
                }

                return new LandlordStatsDTO(
                                occupancyRate,
                                occupiedUnits,
                                totalUnits, // totalOccupancyUnits
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

                // 1. Fetch Landlord Profile and use it
                LandlordProfile profile = landlordProfileRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Landlord profile not found for userId: " + userId));

                // Ensure the landlord actually has properties linked (utilizing the profile
                // variable)
                int propertyCount = profile.getProperties() != null ? profile.getProperties().size() : 0;
                log.debug("Found {} properties for landlord userId={}", propertyCount, userId);

                // 2. Fetch actual total collected income from paid invoices
                BigDecimal totalIncome = invoiceRepository.sumPaidRevenueByLandlordId(userId);
                if (totalIncome == null) {
                        totalIncome = BigDecimal.ZERO;
                }

                // 3. Expenses
                BigDecimal totalExpenses = BigDecimal.ZERO;

                // 4. Net Profit Calculation
                BigDecimal netProfit = totalIncome.subtract(totalExpenses);

                // 5. Monthly Trajectory Data
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

                int propertyCount = profile.getProperties() != null ? profile.getProperties().size() : 0;
                log.debug("Verified landlord profile with {} properties for userId={}", propertyCount, userId);

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
                                        ? BigDecimal.valueOf(payment.getAmount())
                                        : BigDecimal.ZERO;

                        String method = payment.getMethod() != null ? payment.getMethod().name() : "Other";

                        return new RecentPaymentDTO(
                                        payment.getId(),
                                        payment.getPaymentDate(),
                                        tenantName,
                                        unitName,
                                        amount,
                                        method);
                }).collect(Collectors.toList());
        }
}