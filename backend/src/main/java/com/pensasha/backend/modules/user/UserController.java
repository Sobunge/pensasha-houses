package com.pensasha.backend.modules.user;

// Importing required libraries and dependencies
import java.util.List;
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
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.dto.ApiResponse;
import com.pensasha.backend.modules.user.dto.GetAllUsersDTO;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.UpdatePasswordDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

import jakarta.validation.Valid;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

/**
 * UserController handles HTTP requests related to user management.
 * Supports operations like retrieving users, updating profiles, changing
 * passwords, and deleting users.
 * All responses are enriched with HATEOAS links for discoverability.
 */
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

        @Autowired
        private UserService userService;

        /**
         * Update common user details (profile update) for a given user identified by ID
         * number.
         * 
         * @param idNumber       User's ID number.
         * @param updatedUserDTO Updated profile data.
         * @param result         Binding result for validation errors.
         * @return ResponseEntity with the updated user data and HATEOAS links.
         */
        @PutMapping("/update/{idNumber}")
        public ResponseEntity<EntityModel<GetUserDTO>> updateProfile(@PathVariable String idNumber,
                        @Valid @RequestBody UpdateUserDTO updatedUserDTO,
                        BindingResult result) {

                Optional<GetUserDTO> optionalUser = userService.gettingUser(idNumber);

                if (optionalUser.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }

                // Update the user's profile information
                GetUserDTO savedUser = userService.updateUserDetails(idNumber, updatedUserDTO);

                // Wrap the response with HATEOAS links
                EntityModel<GetUserDTO> userModel = EntityModel.of(savedUser,
                                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber()))
                                                .withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.status(HttpStatus.OK).body(userModel);
        }

        /**
         * Change a user's password.
         * 
         * @param idNumber          User's ID number.
         * @param updatePasswordDTO New password data.
         * @return ResponseEntity with a confirmation message and HATEOAS links.
         */
        @PutMapping("/{idNumber}/changePassword")
        public ResponseEntity<EntityModel<String>> changeUserPassword(@PathVariable String idNumber,
                        @RequestBody UpdatePasswordDTO updatePasswordDTO) {

                String response = userService.updateUserPassword(idNumber, updatePasswordDTO);

                // Build response with HATEOAS links
                EntityModel<String> responseModel = EntityModel.of(response,
                                linkTo(methodOn(UserController.class).gettingUser(idNumber)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));

                return ResponseEntity.status(HttpStatus.OK).body(responseModel);
        }

        /**
         * Delete a user by their ID number.
         * 
         * @param idNumber User's ID number.
         * @return ResponseEntity with a status message and HATEOAS links.
         */
        @DeleteMapping("/{idNumber}")
        public ResponseEntity<EntityModel<ApiResponse>> deleteUser(@PathVariable String idNumber) {
                Optional<GetUserDTO> user = userService.gettingUser(idNumber);

                if (user.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(EntityModel.of(
                                                        new ApiResponse("User not found with the provided ID number")));
                }

                // Delete user record
                userService.deleteUser(idNumber);

                // Build success response with HATEOAS links
                EntityModel<ApiResponse> response = EntityModel.of(new ApiResponse("User deleted successfully"),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.ok(response);
        }

        /**
         * Get a specific user by their ID number.
         * 
         * @param idNumber User's ID number.
         * @return ResponseEntity containing user data and HATEOAS links.
         */
        @GetMapping("/{idNumber}")
        public ResponseEntity<EntityModel<GetUserDTO>> gettingUser(@PathVariable String idNumber) {
                Optional<GetUserDTO> user = userService.gettingUser(idNumber);

                if (user.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }

                // Wrap user data with HATEOAS links
                EntityModel<GetUserDTO> response = EntityModel.of(user.get(),
                                linkTo(methodOn(UserController.class).gettingUser(idNumber)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.ok(response);
        }

        /**
         * Get a paginated list of all users.
         * 
         * @param page Page number.
         * @param size Number of records per page.
         * @return Paginated ResponseEntity of users with HATEOAS links.
         */
        @GetMapping
        public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getAllUsers(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                Pageable pageable = PageRequest.of(page, size);

                // Fetch and map users to DTOs
                Page<GetAllUsersDTO> usersPage = userService.getAllUsers(pageable)
                                .map(user -> new GetAllUsersDTO(
                                                user.getFirstName() + " " + user.getThirdName(),
                                                user.getIdNumber(),
                                                user.getPhoneNumber(),
                                                user.getProfilePicture(),
                                                user.getRole()));

                if (usersPage.isEmpty()) {
                        return ResponseEntity.ok(PagedModel.empty());
                }

                // Wrap user DTOs with HATEOAS links
                List<EntityModel<GetAllUsersDTO>> userResources = usersPage.getContent().stream()
                                .map(user -> EntityModel.of(user,
                                                linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                // Prepare pagination metadata
                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                // Build paginated HATEOAS response
                PagedModel<EntityModel<GetAllUsersDTO>> response = PagedModel.of(userResources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);
        }

        /**
         * Get a paginated list of users filtered by their role.
         * 
         * @param role User role.
         * @param page Page number.
         * @param size Number of records per page.
         * @return Paginated ResponseEntity of users by role with HATEOAS links.
         */
        @GetMapping("/role/{userRole}")
        public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getAllUserByRole(@PathVariable Role userRole,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                Pageable pageable = PageRequest.of(page, size);

                // Fetch and map users with specific role
                Page<GetAllUsersDTO> usersPage = userService.gettingUsersByRole(userRole, pageable)
                                .map(user -> new GetAllUsersDTO(
                                                user.getFirstName() + " " + user.getThirdName(),
                                                user.getIdNumber(),
                                                user.getPhoneNumber(),
                                                user.getProfilePicture(),
                                                user.getRole()));

                if (usersPage.isEmpty()) {
                        return ResponseEntity.ok(PagedModel.empty());
                }

                // Wrap user DTOs with HATEOAS links
                List<EntityModel<GetAllUsersDTO>> userResources = usersPage.getContent().stream()
                                .map(user -> EntityModel.of(user,
                                                linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                // Pagination metadata
                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                // Build paginated HATEOAS response
                PagedModel<EntityModel<GetAllUsersDTO>> response = PagedModel.of(userResources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);
        }
}
