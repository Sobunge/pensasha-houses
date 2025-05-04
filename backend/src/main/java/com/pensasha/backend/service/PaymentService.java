package com.pensasha.backend.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.entity.Invoice;
import com.pensasha.backend.entity.Payment;
import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.repository.InvoiceRepository;
import com.pensasha.backend.repository.PaymentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;

    // Adding payment
    public Payment addingPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Updating payment details
    public Payment updatingPaymentDetails(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Getting payment by id
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    // Getting all payments
    public Page<Payment> getAllPayments(Pageable pageable) {
        return paymentRepository.findAll(pageable);
    }

    // Deleting payment
    public void detelePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    // Assigning an invoice to a payment
    public Payment assignPaymentToInvoice(String invoiceId, Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment with id: " + paymentId + " not found"));

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice with id: " + invoiceId + " not found"));

        payment.setInvoice(invoice);
        return paymentRepository.save(payment);
    }
}
