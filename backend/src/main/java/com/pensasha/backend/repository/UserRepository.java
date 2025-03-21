package com.pensasha.backend.user;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.user.models.Role;
import com.pensasha.backend.user.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findAllByRole(Role role, Pageable pageable);

    Optional<User> findByIdNumber(String idNumber);

    Boolean existsByIdNumber(String idNumber);

}
