package com.pensasha.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.entity.Unit;

public interface UnitRepository extends JpaRepository<Unit, Long> {

    Page<Unit> findByIsOccupied(boolean isOccupied, Pageable pageable);
}

