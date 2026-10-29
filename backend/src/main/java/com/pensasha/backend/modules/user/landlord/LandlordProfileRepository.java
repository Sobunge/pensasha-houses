package com.pensasha.backend.modules.user.landlord;

import com.pensasha.backend.modules.payment.MethodsOfPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LandlordProfileRepository extends JpaRepository<LandlordProfile, Long> {

    /**
     * Find a landlord profile by the national ID number of the associated User.
     */
    Optional<LandlordProfile> findByUserIdNumber(String idNumber);

    /**
     * Find a landlord by their dedicated M-Pesa Paybill number.
     * Useful for routing incoming M-Pesa C2B webhooks directly to the right landlord.
     */
    Optional<LandlordProfile> findByMpesaPaybillNumber(String mpesaPaybillNumber);

    /**
     * Find a landlord by their M-Pesa Till number.
     */
    Optional<LandlordProfile> findByMpesaTillNumber(String mpesaTillNumber);

    /**
     * Fetch all landlords who accept a specific payment method (e.g., CASH or MPESA_STK_PUSH).
     */
    @Query("SELECT l FROM LandlordProfile l JOIN l.acceptedPaymentMethods m WHERE m = :paymentMethod")
    List<LandlordProfile> findAllByAcceptedPaymentMethod(@Param("paymentMethod") MethodsOfPayment paymentMethod);
}