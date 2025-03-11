package com.pensasha.backend.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.user.models.CareTaker;

public interface CareTakerRepository extends JpaRepository<CareTaker, String>{

}
