package com.pensasha.backend.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pensasha.backend.user.models.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String idNumber) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByIdNumber(idNumber);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getIdNumber()) // Use idNumber as username
                .password(user.getPassword()) // Use the stored hashed password
                .roles(user.getRole().name()) // Convert Enum to String Role
                .build();
    }
}
