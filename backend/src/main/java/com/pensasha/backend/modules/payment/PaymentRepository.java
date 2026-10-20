package com.pensasha.backend.modules.payment;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Repository interface for managing Payment entities.
 * 
 * This interface provides basic CRUD operations and query method capabilities
 * by extending JpaRepository. No additional methods are currently defined,
 * but custom query methods can be added here if needed.
 */
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT p FROM Payment p " +
            "JOIN p.invoice i " +
            "JOIN i.lease l " +
            "JOIN l.unit u " +
            "JOIN u.property pr " +
            "WHERE pr.landlord.id = :landlordId " +
            "ORDER BY p.paymentDate DESC")
    List<Payment> findRecentPaymentsByLandlordId(@Param("landlordId") Long landlordId, Pageable pageable);
}