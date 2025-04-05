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
import com.pensasha.backend.entity.User;
import com.pensasha.backend.security.JWTUtils;
import com.pensasha.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UserService userService; 

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        // Checks for input validations errors
        if (result.hasErrors()) {

            // Extract simple error messages
            List<String> errors = result.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage()) // Shorter
                                                                                       // message
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(Map.of("errors", errors));

        }

        Optional<User> optionalUser = userService.gettingUser(userDTO.getIdNumber());

        // Checks if the user already exists
        if (optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(EntityModel.of(userDTO,
                            linkTo(methodOn(UserController.class)
                                    .gettingUser(userDTO.getIdNumber()))
                                    .withSelfRel()));
        }

        User savedUser = userService.addUser(userDTO);

        EntityModel<User> userModel = EntityModel.of(savedUser,
                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber()))
                        .withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

        return ResponseEntity.status(HttpStatus.CREATED).body(userModel);
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
