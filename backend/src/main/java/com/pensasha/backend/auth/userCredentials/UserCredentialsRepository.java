package com.pensasha.backend.auth.userCredentials;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.modules.user.User;

public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Long> {
    
    Optional<UserCredentials> findByUser_PhoneNumber(String phoneNumber);
    
    void deleteByUser(User user);

    Optional<UserCredentials> findByUser(User user);
    
}
