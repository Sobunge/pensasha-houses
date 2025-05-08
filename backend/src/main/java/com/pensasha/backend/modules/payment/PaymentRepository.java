package com.pensasha.backend.modules.payment;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for managing Payment entities.
 * 
 * This interface provides basic CRUD operations and query method capabilities
 * by extending JpaRepository. No additional methods are currently defined,
 * but custom query methods can be added here if needed.
 */
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}