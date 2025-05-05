package com.pensasha.backend.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.entity.Payment;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.repository.InvoiceRepository;
import com.pensasha.backend.repository.PaymentRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service class for managing Payment-related business logic.
 */
@Service
@AllArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;

    /**
     * Adds a new payment record to the database.
     *
     * @param payment The payment entity to be saved.
     * @return The saved Payment entity.
     */
    public Payment addPayment(Payment payment) {
        log.info("Adding new payment: {}", payment);
        return paymentRepository.save(payment);
    }

    /**
     * Updates an existing payment's details.
     *
     * @param paymentId      The ID of the payment to update.
     * @param paymentDetails The updated payment details.
     * @return The updated Payment entity.
     * @throws ResourceNotFoundException if the payment is not found.
     */
    @Transactional
    public Payment updatePaymentDetails(Long paymentId, Payment paymentDetails) {
        log.info("Updating payment with ID: {}", paymentId);

        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> {
                    log.error("Payment with id: {} not found", paymentId);
                    return new ResourceNotFoundException("Payment with id: " + paymentId + " not found");
                });

        existingPayment.setAmount(paymentDetails.getAmount());
        existingPayment.setPaymentDate(paymentDetails.getPaymentDate());
        existingPayment.setMethod(paymentDetails.getMethod());
        existingPayment.setInvoice(paymentDetails.getInvoice());

        log.debug("Updated payment details: {}", existingPayment);
        return paymentRepository.save(existingPayment);
    }

    /**
     * Retrieves a payment by its ID.
     *
     * @param id The payment ID.
     * @return An Optional containing the payment if found, or empty otherwise.
     */
    public Optional<Payment> getPaymentById(Long id) {
        log.info("Fetching payment with ID: {}", id);
        return paymentRepository.findById(id);
    }

    /**
     * Retrieves all payments in a paginated format.
     *
     * @param pageable Pagination information.
     * @return A page of payments.
     */
    public Page<Payment> getAllPayments(Pageable pageable) {
        log.info("Fetching all payments with pagination: {}", pageable);
        return paymentRepository.findAll(pageable);
    }

    /**
     * Deletes a payment by its ID.
     *
     * @param id The ID of the payment to delete.
     */
    public void deletePayment(Long id) {
        log.info("Deleting payment with ID: {}", id);
        paymentRepository.deleteById(id);
    }

    /**
     * Assigns an invoice to a payment.
     *
     * @param invoiceId The ID of the invoice.
     * @param paymentId The ID of the payment.
     * @return The updated Payment entity with the assigned invoice.
     * @throws ResourceNotFoundException if either the payment or invoice is not
     *                                   found.
     */
    @Transactional
    public Payment assignPaymentToInvoice(String invoiceId, Long paymentId) {
        log.info("Assigning invoice ID: {} to payment ID: {}", invoiceId, paymentId);

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> {
                    log.error("Payment with id: {} not found", paymentId);
                    return new ResourceNotFoundException("Payment with id: " + paymentId + " not found");
                });

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> {
                    log.error("Invoice with id: {} not found", invoiceId);
                    return new ResourceNotFoundException("Invoice with id: " + invoiceId + " not found");
                });

        payment.setInvoice(invoice);
        log.debug("Linked payment: {} to invoice: {}", paymentId, invoiceId);
        return paymentRepository.save(payment);
    }
}
