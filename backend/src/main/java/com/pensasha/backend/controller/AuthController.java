package com.pensasha.backend.controller;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.dto.LoginRequest;
import com.pensasha.backend.security.JWTUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;

    // Register
    @PostMapping("/register")
    public String register() {

        return "We are in the registration page";
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request, BindingResult result) {

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid input data"));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdNumber(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtils.generateToken(userDetails);
        String roles = userDetails.getAuthorities().toString();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", roles);
        response.put("username", userDetails.getUsername());

        return ResponseEntity.ok(response);
    }

    // Logout

    // Token refresh
}
