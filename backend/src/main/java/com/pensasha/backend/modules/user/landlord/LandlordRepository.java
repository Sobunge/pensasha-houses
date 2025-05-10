package com.pensasha.backend.modules.user.landlord;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LandlordRepository extends JpaRepository<Long, LandLord>{

    Optional<LandLord> findByIdNumber(String idNumber); 
}
