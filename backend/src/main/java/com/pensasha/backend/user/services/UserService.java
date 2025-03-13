package com.pensasha.backend.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

        Optional<User> user = userRepository.findByIdNumber(idNumber);
        userRepository.deleteById(user.get().getId());

    }

    // Getting a single user (Admin)
    public Optional<User> gettingUser(String idNumber) {
        return userRepository.findByIdNumber(idNumber);
    }

    // Getting all users (Admin)
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // Getting a user by role
    public List<User> gettingUsersByRole(Role role) {
        return userRepository.findAllByRole(role);
    }

}
