package com.pensasha.backend.security;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;
import com.pensasha.backend.modules.user.CustomUserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service class responsible for loading user-specific data for Spring Security.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Load a user by idNumber (username) and wrap it in CustomUserDetails.
     *
     * @param idNumber the user idNumber
     * @return CustomUserDetails instance
     * @throws UsernameNotFoundException if user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String idNumber) throws UsernameNotFoundException {
        // Fetch the user from the database
        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Wrap and return as CustomUserDetails
        return new CustomUserDetails(user);
    }
}
