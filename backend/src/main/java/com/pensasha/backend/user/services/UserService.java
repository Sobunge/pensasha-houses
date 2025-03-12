package com.pensasha.backend.user.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pensasha.backend.role.Role;
import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Adding a new user (Admin)
    public User addingAnAdmin(User user) {
        return userRepository.save(user);
    }

    // Editing user details (Admin)
    public User updateUserDetails(User updatedUser) {
        return userRepository.save(updatedUser);
    }

    // Deleting a user (Admin)
    public void deleteUser(String idNumber) {
        userRepository.deleteByIdNumber(idNumber);
    }

    // Getting a single user (Admin)
    public User gettingUser(String idNumber) {
        return userRepository.findByIdNumber(idNumber).get();
    }

    // Getting all users (Admin)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Getting a user by role
    public List<User> gettingUsersByRole(Role role) {
        return userRepository.findAllByRole(role);
    }

}
