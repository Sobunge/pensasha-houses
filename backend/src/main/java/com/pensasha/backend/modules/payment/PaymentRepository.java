package com.pensasha.backend.modules.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // 1. Prevent duplicate M-Pesa processing during Daraja webhook retries
    Optional<Payment> findByTransactionReference(String transactionReference);

    // 2. Fetch all payments made by a specific tenant
    List<Payment> findByTenantIdOrderByPaymentDateDesc(Long tenantId, Pageable pageable);

    // 3. Calculate total revenue collected for a specific landlord within a date range (for financial reports)
    @Query("SELECT SUM(p.amount) FROM Payment p " +
           "JOIN p.tenant t " +
           "WHERE p.status = 'COMPLETED' " +
           "AND p.paymentDate BETWEEN :startDate AND :endDate")
    BigDecimal sumCompletedPaymentsByDateRange(
        @Param("startDate") LocalDateTime startDate, 
        @Param("endDate") LocalDateTime endDate
    );
}