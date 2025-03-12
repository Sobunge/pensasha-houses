package com.pensasha.backend.user.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.role.Role;
import com.pensasha.backend.user.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAllByRole(Role role);
    void deleteByIdNumber(String idNumber);
    Optional<User> findByIdNumber(String idNumber);
    Boolean existsByIdNumber(String idNumber);

}
