package com.pensasha.backend.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.user.models.CareTaker;

public interface CareTakerRepository extends JpaRepository<CareTaker, Long>{

    void deleteByIdNumber(String idNumber);

    Optional<CareTaker> findByIdNumber(String idNumber);

}
