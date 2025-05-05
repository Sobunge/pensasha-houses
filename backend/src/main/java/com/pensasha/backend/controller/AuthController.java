package com.pensasha.backend.controller;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
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
import com.pensasha.backend.dto.UserDTO;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserService;
import com.pensasha.backend.security.JWTUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@RequestMapping("/api/auth")  // Base URL for authentication endpoints
@RequiredArgsConstructor  // Automatically injects dependencies via constructor
public class AuthController {

    private final AuthenticationManager authenticationManager; // Handles user authentication
    private final JWTUtils jwtUtils; // Utility for generating JWT tokens
    private final UserService userService; // Service to handle user-related operations

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        // Checks for input validation errors
        if (result.hasErrors()) {
            // Extract simple error messages
            List<String> errors = result.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage()) // Shorter error message
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(Map.of("errors", errors));  // Return 400 with errors
        }

        // Check if the user already exists by ID
        Optional<User> optionalUser = userService.gettingUser(userDTO.getIdNumber());

        // If user exists, return a conflict response
        if (optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(EntityModel.of(userDTO,
                            linkTo(methodOn(UserController.class)
                                    .gettingUser(userDTO.getIdNumber()))  // Self-link to the user
                                    .withSelfRel()));
        }

        // Create and save the new user
        User savedUser = userService.addUser(userDTO);

        // Wrap the saved user in a HATEOAS response model, including links to the user and all users
        EntityModel<User> userModel = EntityModel.of(savedUser,
                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber()))  // Self-link to the saved user
                        .withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));  // Link to all users

        return ResponseEntity.status(HttpStatus.CREATED).body(userModel);  // Return 201 with user info and links
    }

    // User login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request, BindingResult result) {

        // Check for input validation errors in the login request
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid input data"));
        }

        // Authenticate the user with the provided ID and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdNumber(), request.getPassword()));

        // Store the authentication details in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get the user details from the authentication token
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // Generate a JWT token for the authenticated user
        String token = jwtUtils.generateToken(userDetails);
        
        // Extract roles of the user into a list of strings
        List<String> roles = userDetails.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())  // Map authorities to string roles
                .collect(Collectors.toList());

        // Prepare the response containing token, roles, and username
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", roles);
        response.put("username", userDetails.getUsername());

        // Return the response with the JWT token and user info
        return ResponseEntity.ok(response);
    }

    // Future endpoints can include logout and token refresh functionality
}
