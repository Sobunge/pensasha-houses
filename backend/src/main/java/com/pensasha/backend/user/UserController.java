package com.pensasha.backend.user.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.role.Role;
import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.models.dto.ApiResponse;
import com.pensasha.backend.user.models.dto.UpdateUserDTO;
import com.pensasha.backend.user.models.dto.UserDTO;
import com.pensasha.backend.user.services.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@RequestMapping(path = "/user")
public class UserController {

        @Autowired
        private UserService userService;

        @Autowired
        private PasswordEncoder passwordEncoder; // Inject password encoder

        // Adding a new user
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

                if (optionalUser.isPresent()) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                        .body(EntityModel.of(userDTO,
                                                        linkTo(methodOn(UserController.class)
                                                                        .gettingUser(userDTO.getIdNumber()))
                                                                        .withSelfRel()));
                }

                User newUser = new User();

                newUser.setFirstName(userDTO.getFirstName());
                newUser.setSecondName(userDTO.getSecondName());
                newUser.setThirdName(userDTO.getThirdName());
                newUser.setIdNumber(userDTO.getIdNumber());
                newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                newUser.setPhoneNumber(userDTO.getPhoneNumber());
                newUser.setRole(userDTO.getRole());

                if (userDTO.getProfilePicture() != null && !userDTO.getProfilePicture().isEmpty()) {
                        newUser.setProfilePicture(userDTO.getProfilePicture());
                }

                User savedUser = userService.addingAnAdmin(newUser);

                EntityModel<User> userModel = EntityModel.of(savedUser,
                                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber()))
                                                .withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.status(HttpStatus.CREATED).body(userModel);
        }

        // Editing common user details
        @PutMapping("/update/{idNumber}")
        public ResponseEntity<EntityModel<User>> updateProfile(@PathVariable String idNumber,
                        @Valid @RequestBody UpdateUserDTO updatedUserDetails, BindingResult result) {

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

                User savedUser = userService.addingAnAdmin(user);

                EntityModel<User> userModel = EntityModel.of(savedUser,
                                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber()))
                                                .withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.status(HttpStatus.OK).body(userModel);

        }

        // Editing user details (Landlord)
        public ResponseEntity<EntityModel<LandLord>> updateProfile(@PathVariable String idNumber,
                        @Valid @RequestBody UpdateUserDTO updatedUserDetails, BindingResult result) {

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

                User savedUser = userService.addingAnAdmin(user);

                EntityModel<User> userModel = EntityModel.of(savedUser,
                                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber()))
                                                .withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.status(HttpStatus.OK).body(userModel);

        }

        // Deleting a user
        @DeleteMapping("/{idNumber}")
        public ResponseEntity<EntityModel<ApiResponse>> deleteUser(@PathVariable String idNumber) {
                Optional<User> user = userService.gettingUser(idNumber);

                if (user.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(EntityModel.of(
                                                        new ApiResponse("User not found with the provided ID number")));
                }

                userService.deleteUser(idNumber);

                EntityModel<ApiResponse> response = EntityModel.of(new ApiResponse("User deleted successfully"),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.ok(response);
        }

        // Getting a single user
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
        public ResponseEntity<PagedModel<EntityModel<User>>> getAllUsers(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                Pageable pageable = PageRequest.of(page, size);
                Page<User> usersPage = userService.getAllUsers(pageable);

                if (usersPage.isEmpty()) {
                        return ResponseEntity.ok(PagedModel.empty());
                }

                List<EntityModel<User>> userResources = usersPage.getContent().stream()
                                .map(user -> EntityModel.of(user,
                                                linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                PagedModel<EntityModel<User>> response = PagedModel.of(userResources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);

        }

        @GetMapping("/role/{userRole}")
        public ResponseEntity<PageModel<EntityModel<User>>> getAllUserByRole(@PathVariable Role role,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                Pageable pageable = PageRequest.of(page, size);
                Page<User> usersPage = userService.gettingUsersByRole(role, pageable);

                if (usersPage.isEmpty()) {
                        return ResponseEntity.ok(PagedModel.empty());
                }

                List<EntityModel<User>> userResources = usersPage.getContent().stream()
                                .map(user -> EntityModel.of(user,
                                                linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                PagedModel<EntityModel<User>> response = PagedModel.of(userResources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);

        }
}