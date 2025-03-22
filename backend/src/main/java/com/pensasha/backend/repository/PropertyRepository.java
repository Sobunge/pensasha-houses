package com.pensasha.backend.repository;

import com.pensasha.backend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PropertyRepository extends JpaRepository<Property, Long>{

    List<Property> findAllByLandLord_IdNumber(String idNumber);
}
