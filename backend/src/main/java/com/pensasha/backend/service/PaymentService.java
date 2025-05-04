package com.pensasha.backend.service;

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

    //Getting payment by id

    //Getting pall payments

    //Deleting payment

    //Assigning an invoice to a payment
}
