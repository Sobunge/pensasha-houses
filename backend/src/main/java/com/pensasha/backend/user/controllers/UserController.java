package com.pensasha.backend.user.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.role.Role;
import com.pensasha.backend.user.models.UpdateUserDTO;
import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.services.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@RequestMapping(name = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Adding a new user (Admin)
    @PostMapping("/register")
    public ResponseEntity<EntityModel<User>> addUser(@RequestBody User user) {

        Optional<User> optionalUser = userService.gettingUser(user.getIdNumber());

        if (!optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(EntityModel.of(user,
                            linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber())).withSelfRel()));
        }

        User savedUser = userService.addingAnAdmin(user);

        EntityModel<User> userModel = EntityModel.of(savedUser,
                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber())).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

        return ResponseEntity.status(HttpStatus.CREATED).body(userModel);
    }

    // Editing user details (Admin)
    @PutMapping("/{idNumber}")
    public ResponseEntity<EntityModel<User>> updateProfile(@PathVariable String idNumber,
            @RequestBody UpdateUserDTO updatedUserDetails) {

        Optional<User> optionalUser = userService.gettingUser(idNumber);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = optionalUser.get();
        user.setFirstName(updatedUserDetails.getFirstName());
        user.setSecondName(updatedUserDetails.getSecondName());
        user.setThirdName(updatedUserDetails.getThirdName());
        user.setIdNumber(updatedUserDetails.getIdNumber());
        user.setPhoneNumber(updatedUserDetails.getPhoneNumber());

        try {
            Role newRole = Role.valueOf(updatedUserDetails.getRole());
            user.setRole(newRole);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        User savedUser = userService.addingAnAdmin(user);

        EntityModel<User> userModel = EntityModel.of(savedUser,
                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber())).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

        return ResponseEntity.status(HttpStatus.OK).body(userModel);

    }

    // Deleting a user (Admin)
    @DeleteMapping("/{idNumber}")
    public ResponseEntity<EntityModel<String>> deleteUser(@PathVariable String idNumber) {
        Optional<User> user = userService.gettingUser(idNumber);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityModel.of("User not found with the provided ID number"));
        }

        userService.deleteUser(idNumber);

        EntityModel<String> response = EntityModel.of("User deleted successfully",
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

        return ResponseEntity.ok(response);
    }

    // Getting a single user (Admin)
    @GetMapping("/{idNumber}")
    public ResponseEntity<EntityModel<User>> gettingUser(@PathVariable String idNumber) {
        Optional<User> user = userService.gettingUser(idNumber);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EntityModel<User> response = EntityModel.of(user.get(),
                linkTo(methodOn(UserController.class).gettingUser(idNumber)).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

        return ResponseEntity.ok(response);
    }

    // Getting all users (Admin)
    @GetMapping("/all")
    public ResponseEntity<CollectionModel<EntityModel<User>>> getAllUsers(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userService.getAllUsers(pageable);

        if (usersPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        List<EntityModel<User>> userResources = usersPage.getContent().stream()
                .map(user -> EntityModel.of(user,
                        linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber())).withSelfRel(),
                        linkTo(methodOn(UserController.class).getAllUsers(page, size)).withRel("all-users")))
                .collect(Collectors.toList());

        CollectionModel<EntityModel<User>> response = CollectionModel.of(userResources,
                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel());

        return ResponseEntity.ok(response);

    }

}