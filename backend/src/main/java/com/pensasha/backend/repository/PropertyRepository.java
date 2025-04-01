package com.pensasha.backend.repository;

import com.pensasha.backend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface PropertyRepository extends JpaRepository<Property, Long>{

    List<Property> findAllByLandLord_IdNumber(String idNumber);
}
