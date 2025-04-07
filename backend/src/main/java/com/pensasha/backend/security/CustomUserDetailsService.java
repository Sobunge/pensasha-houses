package com.pensasha.backend.security;

import com.pensasha.backend.entity.User;
import com.pensasha.backend.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String idNumber) throws UsernameNotFoundException {

        // Fetch user from database
        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Ensure that authorities (roles) are correctly set
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());

        // Return UserDetails with role in List<GrantedAuthority>
        return new org.springframework.security.core.userdetails.User(
                user.getIdNumber(),
                user.getPassword(),
                List.of(authority) // Wrap in a List<GrantedAuthority>
        );
    }
}
