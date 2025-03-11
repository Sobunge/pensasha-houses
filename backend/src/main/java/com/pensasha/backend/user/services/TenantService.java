package com.pensasha.backend.user.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pensasha.backend.user.repositories.TenantRepository;

@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;
    
}
