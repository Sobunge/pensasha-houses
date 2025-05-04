package com.pensasha.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.entity.Payment;

public interface PaymentRepository extends JpaRepository <Payment, Long>{

}
