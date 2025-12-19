package com.pensasha.backend.modules.payment;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.invoice.InvoiceRepository;

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

    public Payment addPayment(Payment payment) {
        log.info("Adding new payment: {}", payment);
        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment updatePaymentDetails(Long paymentId, Payment paymentDetails) {
        log.info("Updating payment with ID: {}", paymentId);

        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Payment with id: " + paymentId + " not found"));

        existingPayment.setAmount(paymentDetails.getAmount());
        existingPayment.setPaymentDate(paymentDetails.getPaymentDate());
        existingPayment.setMethod(paymentDetails.getMethod());
        existingPayment.setInvoice(paymentDetails.getInvoice());

        log.debug("Updated payment details: {}", existingPayment);
        return paymentRepository.save(existingPayment);
    }

    public Optional<Payment> getPaymentById(Long id) {
        log.info("Fetching payment with ID: {}", id);
        return paymentRepository.findById(id);
    }

    public Page<Payment> getAllPayments(Pageable pageable) {
        log.info("Fetching all payments with pagination: {}", pageable);
        return paymentRepository.findAll(pageable);
    }

    public void deletePayment(Long id) {
        log.info("Deleting payment with ID: {}", id);
        paymentRepository.deleteById(id);
    }

    @Transactional
    public Payment assignPaymentToInvoice(UUID invoiceId, Long paymentId) {
        log.info("Assigning invoice ID: {} to payment ID: {}", invoiceId, paymentId);

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Payment with id: " + paymentId + " not found"));

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Invoice with id: " + invoiceId + " not found"));

        payment.setInvoice(invoice);
        log.debug("Linked payment: {} to invoice: {}", paymentId, invoiceId);
        return paymentRepository.save(payment);
    }
}
