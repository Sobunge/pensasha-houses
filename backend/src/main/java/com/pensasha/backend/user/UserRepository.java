package com.pensasha.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.user.models.User;

public interface UserRepository extends JpaRepository<User, String> {

}
