package com.pensasha.backend.user.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.role.Role;
import com.pensasha.backend.user.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAllByRole(Role role);

}
