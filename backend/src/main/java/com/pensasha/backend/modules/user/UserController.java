package com.pensasha.backend.modules.user;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.dto.ApiResponse;
import com.pensasha.backend.modules.user.dto.GetAllUsersDTO;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.UpdatePasswordDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import com.pensasha.backend.modules.user.helper.ParseRoleHelper;

import jakarta.validation.Valid;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

/**
 * REST controller for user management.
 * Supports CRUD operations, password updates, and role-based queries.
 * Responses include HATEOAS links for discoverability.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

        @Autowired
        private UserService userService;

        /* ===================== UPDATE PROFILE ===================== */

        @PutMapping("/update/{idNumber}")
        public ResponseEntity<EntityModel<GetUserDTO>> updateProfile(
                        @PathVariable String idNumber,
                        @Valid @RequestBody UpdateUserDTO updatedUserDTO,
                        BindingResult result) {

                GetUserDTO updatedUser = userService.updateUser(idNumber, updatedUserDTO);

                EntityModel<GetUserDTO> model = EntityModel.of(updatedUser,
                                linkTo(methodOn(UserController.class).getUser(idNumber)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));

                return ResponseEntity.ok(model);
        }

        /* ===================== CHANGE PASSWORD ===================== */

        @PutMapping("/{idNumber}/changePassword")
        public ResponseEntity<EntityModel<ApiResponse>> changePassword(
                        @PathVariable String idNumber,
                        @RequestBody UpdatePasswordDTO dto) {

                userService.updatePassword(idNumber, dto);

                EntityModel<ApiResponse> response = EntityModel.of(
                                new ApiResponse("Password updated successfully"),
                                linkTo(methodOn(UserController.class).getUser(idNumber)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));

                return ResponseEntity.ok(response);
        }

        /* ===================== DELETE USER ===================== */

        @DeleteMapping("/{idNumber}")
        public ResponseEntity<EntityModel<ApiResponse>> deleteUser(@PathVariable String idNumber) {

                userService.deleteUser(idNumber);

                EntityModel<ApiResponse> response = EntityModel.of(
                                new ApiResponse("User deleted successfully"),
                                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));

                return ResponseEntity.ok(response);
        }

        /* ===================== GET SINGLE USER ===================== */

        @GetMapping("/{idNumber}")
        public ResponseEntity<EntityModel<GetUserDTO>> getUser(@PathVariable String idNumber) {

                GetUserDTO user = userService.getUser(idNumber);

                EntityModel<GetUserDTO> model = EntityModel.of(user,
                                linkTo(methodOn(UserController.class).getUser(idNumber)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));

                return ResponseEntity.ok(model);
        }

        @GetMapping("/me")
        public ResponseEntity<EntityModel<GetUserDTO>> getCurrentUser(
                        @AuthenticationPrincipal CustomUserDetails authUser) {
                GetUserDTO user = userService.getUser(authUser.getUsername());
                EntityModel<GetUserDTO> model = EntityModel.of(user,
                                linkTo(methodOn(UserController.class).getUser(user.getIdNumber())).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));
                return ResponseEntity.ok(model);
        }

        /* ===================== GET ALL USERS ===================== */

        @GetMapping
        public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getAllUsers(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {

                Pageable pageable = PageRequest.of(page, size);

                Page<GetUserDTO> usersPage = userService.getAllUsers(pageable);

                List<EntityModel<GetAllUsersDTO>> resources = usersPage.stream()
                                .map(user -> new GetAllUsersDTO(
                                                user.getFirstName() + " " + user.getLastName(),
                                                user.getIdNumber(),
                                                user.getPhoneNumber(),
                                                user.getProfilePicture(),
                                                user.getRole()))
                                .map(dto -> EntityModel.of(dto,
                                                linkTo(methodOn(UserController.class).getUser(dto.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                PagedModel<EntityModel<GetAllUsersDTO>> response = PagedModel.of(resources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);
        }

        /* ===================== GET USERS BY ROLE ===================== */

        @GetMapping("/role/{role}")
        public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getUsersByRole(
                        @PathVariable String role,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) throws BadRequestException {

                if (role == null || role.isBlank()) {
                        throw new BadRequestException("Role parameter cannot be null or empty");
                }

                Role parsedRole = ParseRoleHelper.parseRole(role);
                Pageable pageable = PageRequest.of(page, size);

                Page<GetUserDTO> usersPage = userService.getUsersByRole(parsedRole, pageable);

                List<EntityModel<GetAllUsersDTO>> resources = usersPage.stream()
                                .map(user -> new GetAllUsersDTO(
                                                user.getFirstName() + " " + user.getLastName(),
                                                user.getIdNumber(),
                                                user.getPhoneNumber(),
                                                user.getProfilePicture(),
                                                user.getRole()))
                                .map(dto -> EntityModel.of(dto,
                                                linkTo(methodOn(UserController.class).getUser(dto.getIdNumber()))
                                                                .withSelfRel()))
                                .collect(Collectors.toList());

                PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                                usersPage.getTotalElements());

                PagedModel<EntityModel<GetAllUsersDTO>> response = PagedModel.of(resources, metadata,
                                linkTo(methodOn(UserController.class).getAllUsers(0, size)).withRel("first-page"),
                                linkTo(methodOn(UserController.class).getAllUsers(page, size)).withSelfRel(),
                                linkTo(methodOn(UserController.class).getAllUsers(usersPage.getTotalPages() - 1, size))
                                                .withRel("last-page"));

                return ResponseEntity.ok(response);
        }
}
