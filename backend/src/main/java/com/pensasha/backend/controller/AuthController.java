package com.pensasha.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.dto.LoginRequest;
import com.pensasha.backend.security.CustomUserDetailsService;
import com.pensasha.backend.security.JWTUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService userDetailsService;

    // Register
    @PostMapping("/register")
    public String register() {

        return "We are in the registration page";
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest request, BindingResult result) {

        // Validate input
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid input data");
        }

        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdNumber(), request.getPassword()));

        // Load user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getIdNumber());

        // Generate JWT token
        String token = jwtUtils.generateToken(userDetails);

        return ResponseEntity.ok("{\"token\": \"" + token + "\"}");

    }

    // Logout

    // Token refresh
}
