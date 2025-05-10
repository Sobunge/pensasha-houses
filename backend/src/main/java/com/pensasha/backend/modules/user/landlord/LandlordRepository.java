package com.pensasha.backend.modules.user.landlord;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LandlordRepository extends JpaRepository<LandLord, Long>{

    Optional<LandLord> findByIdNumber(String idNumber); 
}
