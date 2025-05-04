package com.pensasha.backend.security;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// Service class responsible for loading user-specific data in the context of Spring Security
@Service
public class CustomUserDetailsService implements UserDetailsService {

    // Inject the UserRepository to interact with the database
    @Autowired
    private UserRepository userRepository;

    // This method loads a user by their username (in this case, the idNumber)
    @Override
    public UserDetails loadUserByUsername(String idNumber) throws UsernameNotFoundException {

        // Fetch the user from the database by idNumber
        // If no user is found, throw a UsernameNotFoundException with a relevant message
        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Ensure that authorities (roles) are properly set. Here we use the user's role as a granted authority.
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());

        // Return a UserDetails object containing the user's idNumber, password, and authorities
        return new org.springframework.security.core.userdetails.User(
                user.getIdNumber(), // Username (idNumber)
                user.getPassword(),  // User's password
                List.of(authority)   // User's roles wrapped in a list of GrantedAuthority
        );
    }
}
