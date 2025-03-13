package com.pensasha.backend.user.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pensasha.backend.user.models.CareTaker;
import com.pensasha.backend.user.repositories.CareTakerRepository;

@Service
public class CareTakerService {

    @Autowired
    private CareTakerRepository careTakerRepository;

    // Adding a new user (CareTaker)
    public CareTaker addCareTaker(CareTaker careTaker) {
        return careTakerRepository.save(careTaker);
    }

    // Editing user details (CareTaker)
    public CareTaker updateCareTaker(CareTaker careTaker) {
        return careTakerRepository.save(careTaker);
    }

    // Deleting a user (CareTaker)
    public void deleteCareTaker(String idNumber) {
        careTakerRepository.deleteByIdNumber(idNumber);
    }

    // Getting a single user (CareTaker)
    public CareTaker gettingCareTaker(String idNumber) {
        return careTakerRepository.findByIdNumber(idNumber);
    }

    // Getting all users (CareTaker)
    public List<CareTaker> gettingAllCareTakers() {
        return careTakerRepository.findAll();
    }

}
