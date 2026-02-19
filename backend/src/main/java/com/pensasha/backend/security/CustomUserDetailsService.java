package com.pensasha.backend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pensasha.backend.modules.user.CustomUserDetails;
import com.pensasha.backend.modules.user.UserCredentials;
import com.pensasha.backend.modules.user.UserCredentialsRepository;

import lombok.RequiredArgsConstructor;

/**
 * Loads user authentication data based on phone number.
 * Authentication is credential-driven, not user-driven.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserCredentialsRepository userCredentialsRepository;

    /**
     * Load user credentials by phone number and wrap in CustomUserDetails.
     *
     * @param phoneNumber user phone number (used as username)
     * @return UserDetails implementation
     * @throws UsernameNotFoundException if credentials are not found
     */
    @Override
    public UserDetails loadUserByUsername(String phoneNumber)
            throws UsernameNotFoundException {

        UserCredentials credentials = userCredentialsRepository
                .findByUser_PhoneNumber(phoneNumber)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Authentication failed: user not found with phone " + phoneNumber
                        )
                );

        return new CustomUserDetails(credentials);
    }
}
