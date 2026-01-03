package com.pensasha.backend.modules.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Long> {
    
    Optional<UserCredentials> findByUser_IdNumber(String idNumber);
    
    void deleteByUser(User user);
    
}
