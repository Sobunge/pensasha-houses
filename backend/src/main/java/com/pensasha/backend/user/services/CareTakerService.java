package com.pensasha.backend.user.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pensasha.backend.user.repositories.CareTakerRepository;

@Service
public class CareTakerService {

    @Autowired
    private CareTakerRepository careTakerRepository;

    
}
