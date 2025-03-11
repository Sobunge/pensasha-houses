package com.pensasha.backend.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.user.models.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, String>{

}
