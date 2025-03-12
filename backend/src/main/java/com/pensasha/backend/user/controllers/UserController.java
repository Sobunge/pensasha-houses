package com.pensasha.backend.user.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.user.models.UpdateUserDTO;
import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(name = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Adding a new user (Admin)
    @PostMapping("/register")
    public ResponseEntity<EntityModel<User>> addUser(@RequestBody User user) {
        if (userService.doesUserExist(user.getIdNumber().equals(true))) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(EntityModel.of(user,
                            linkTo(methodOn(UserController.class).getUser(user.getIdNumber())).withSelfRel()));
        }

        User savedUser = userService.addingAnAdmin(user);

        EntityModel<User> userModel = EntityModel.of(savedUser,
                linkTo(methodOn(UserController.class).getUser(savedUser.getIdNumber())).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers()).withRel("all-users"));

        return ResponseEntity.status(HttpStatus.CREATED).body(userModel);
    }

    // Editing user details (Admin)
    @PutMapping("/{idNumber}")
    public ResponseEntity<EntityModel<User>> updateProfile(@PathVariable String idNumber,
            @RequestBody UpdateUserDTO updatedUserDetails) {

        Optional<User> optionalUser = userService.gettingUser(idNumber);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with the provided ID number");
        }

        User user = optionalUser.get();
        user.setFirstName(updatedUserDetails.getFirstName());
        user.setSecondName(updatedUserDetails.getSecondName());
        user.setThirdName(updatedUserDetails.getThirdName());
        user.setIdNumber(updatedUserDetails.getIdNumber());
        user.setPhoneNumber(updatedUserDetails.getPhoneNumber());

        try {
            Role newRole = Role.valueOf(UpdateUserDTO.getRole().toUpperCase());
            user.setRole(newRole);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role provided");
        }

        User savedUser = userService.addingAnAdmin(user);

        EntityModel<User> userModel = EntityModel.of(savedUser,
                linkTo(methodOn(UserController.class).getUser(savedUser.getIdNumber())).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers()).withRel("all-users"));

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
                linkTo(methodOn(UserController.class).getAllUsers()).withRel("all-users"));

        return ResponseEntity.ok(response);
    }

    // Getting a single user (Admin)
    @GetMapping("/{idNumber}")
    public ResponseEntity<User> gettingUser(@PathVariable String idNumber) {
        Optional<User> user = userService.gettingUser(idNumber);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EntityModel<User> response = EntityModel.of(user.get(),
                linkTo(methodOn(UserController.class).gettingUser(idumber)).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers()).withRel("all-users"));

        return ResponseEntity.ok(response);
    }

    // Getting all users (Admin)
    @GetMapping("/all")
    public ResponseEntity<CollectionModel<User>> getAllUsers(@RequestParam(defaultValue = "0") int page,
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