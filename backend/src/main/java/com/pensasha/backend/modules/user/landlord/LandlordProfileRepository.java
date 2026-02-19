package com.pensasha.backend.modules.user.landlord;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LandlordProfileRepository extends JpaRepository<LandlordProfile, Long>{

    Optional<LandlordProfile> findByUserIdNumber(String idNumber); 
}
