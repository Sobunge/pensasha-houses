package com.pensasha.backend.modules.user;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.dto.ApiResponse;
import com.pensasha.backend.modules.user.dto.GetAllUsersDTO;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.UpdatePasswordDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {

        @Autowired
        private UserService userService;

        // Editing common user details (Profile update)
        @PutMapping("/update/{idNumber}")
        public ResponseEntity<EntityModel<GetUserDTO>> updateProfile(@PathVariable String idNumber,
                        @Valid @RequestBody UpdateUserDTO updatedUserDTO, BindingResult result) {

                Optional<GetUserDTO> optionalUser = userService.gettingUser(idNumber);

                // Return 404 if the user with the given ID does not exist
                if (optionalUser.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }

                // Update the user's details
                User savedUser = userService.updateUserDetails(idNumber, updatedUserDTO);

                GetUserDTO responseDTO = new GetUserDTO(
                                savedUser.getFirstName(),
                                savedUser.getSecondName(),
                                savedUser.getThirdName(),
                                savedUser.getIdNumber(),
                                savedUser.getPhoneNumber(),
                                savedUser.getProfilePicture(),
                                savedUser.getRole());

                // Creating response model with HATEOAS links
                EntityModel<GetUserDTO> userModel = EntityModel.of(responseDTO,
                                linkTo(methodOn(UserController.class).gettingUser(responseDTO.getIdNumber()))
                                                .withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.status(HttpStatus.OK).body(userModel);
        }

        // Changing a user's password
        @PutMapping("/{idNumber}/changePassword")
        public ResponseEntity<EntityModel<String>> changeUserPassword(@PathVariable String idNumber,
                        UpdatePasswordDTO updatePasswordDTO) {

                // Update the password for the given user
                String response = userService.updateUserPassword(idNumber, updatePasswordDTO);

                // Create response model with HATEOAS links
                EntityModel<String> responseModel = EntityModel.of(response,
                                linkTo(methodOn(UserController.class).gettingUser(idNumber)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.status(HttpStatus.OK).body(responseModel);
        }

        // Deleting a user
        @DeleteMapping("/{idNumber}")
        public ResponseEntity<EntityModel<ApiResponse>> deleteUser(@PathVariable String idNumber) {
                Optional<GetUserDTO> user = userService.gettingUser(idNumber);

                // Return 404 if the user with the given ID does not exist
                if (user.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(EntityModel.of(
                                                        new ApiResponse("User not found with the provided ID number")));
                }

                // Delete the user
                userService.deleteUser(idNumber);

                // Response after successful deletion with HATEOAS links
                EntityModel<ApiResponse> response = EntityModel.of(new ApiResponse("User deleted successfully"),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.ok(response);
        }

        // Getting a single user by their ID number
        @GetMapping("/{idNumber}")
        public ResponseEntity<EntityModel<GetUserDTO>> gettingUser(@PathVariable String idNumber) {
                Optional<GetUserDTO> user = userService.gettingUser(idNumber);

                // Return 404 if the user with the given ID does not exist
                if (user.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }

                // Creating response model with HATEOAS links
                EntityModel<GetUserDTO> response = EntityModel.of(user.get(),
                                linkTo(methodOn(UserController.class).gettingUser(idNumber)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

                return ResponseEntity.ok(response);
        }

        // Getting all users (for admin use, paginated)
        @GetMapping("/all")
        public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getAllUsers(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                Pageable pageable = PageRequest.of(page, size);
                Page<GetAllUsersDTO> usersPage = userService.getAllUsers(pageable)
                .map(user -> new GetAllUsersDTO(
                        user.getFirstName() + " " + user.getThirdName(),
                        user.getIdNumber(),
                        user.getPhoneNumber(),
                        user.getProfilePicture(),
                        user.getRole()
                ));

                // Return empty response if no users are found
                if (usersPage.isEmpty()) {
                        return ResponseEntity.ok(PagedModel.empty());
                }

                // Map users to HATEOAS entity models
                List<EntityModel<GetAllUsersDTO>> userResources = usersPage.getContent().stream()
                                .map(user -> EntityModel.of(user,
                                                linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                // Metadata for paginated response
                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                // Building paginated model with HATEOAS links
                PagedModel<EntityModel<GetAllUsersDTO>> response = PagedModel.of(userResources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);
        }

        // Getting all users by role (for admin use, paginated)
        @GetMapping("/role/{userRole}")
        public ResponseEntity<PagedModel<EntityModel<User>>> getAllUserByRole(@PathVariable Role role,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                Pageable pageable = PageRequest.of(page, size);
                Page<User> usersPage = userService.gettingUsersByRole(role, pageable);

                // Return empty response if no users are found
                if (usersPage.isEmpty()) {
                        return ResponseEntity.ok(PagedModel.empty());
                }

                // Map users to HATEOAS entity models
                List<EntityModel<User>> userResources = usersPage.getContent().stream()
                                .map(user -> EntityModel.of(user,
                                                linkTo(methodOn(UserController.class).gettingUser(user.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                // Metadata for paginated response
                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                // Building paginated model with HATEOAS links
                PagedModel<EntityModel<User>> response = PagedModel.of(userResources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);
        }
}
