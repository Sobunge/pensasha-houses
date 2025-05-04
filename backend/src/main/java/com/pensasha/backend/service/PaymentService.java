package com.pensasha.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pensasha.backend.entity.Payment;
import com.pensasha.backend.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    //Adding payment
    public Payment addingPayment(Payment payment){
        return paymentRepository.save(payment);
    }

    //Updating payment details
    public Payment updatingPaymentDetails(Payment payment){
        return paymentRepository.save(payment);
    }

    //Getting payment by id
    public Optional<Payment> getPaymentById(Long id){
        return paymentRepository.findById(id);
    }

    //Getting all payments

    //Deleting payment

    //Assigning an invoice to a payment
}
