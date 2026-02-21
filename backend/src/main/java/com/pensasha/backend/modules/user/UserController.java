package com.pensasha.backend.modules.user;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.dto.ApiResponse;
import com.pensasha.backend.modules.user.dto.GetAllUsersDTO;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.ResetPasswordDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import com.pensasha.backend.modules.user.helper.ParseRoleHelper;
import com.pensasha.backend.security.AuthUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthUtils authUtils;

    /* ===================== UPDATE PROFILE ===================== */
    @PutMapping("/update/{id}")
    public ResponseEntity<EntityModel<GetUserDTO>> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserDTO updatedUserDTO) {

        GetUserDTO updatedUser = userService.updateUser(id, updatedUserDTO);

        EntityModel<GetUserDTO> model = EntityModel.of(
                updatedUser,
                linkTo(methodOn(UserController.class).getUserById(id)).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users")
        );

        return ResponseEntity.ok(model);
    }

    /* ===================== CHANGE PASSWORD ===================== */
    @PutMapping("/{id}/changePassword")
    public ResponseEntity<EntityModel<ApiResponse>> changePassword(
            @PathVariable Long id,
            @RequestBody ResetPasswordDTO dto) {

        userService.updatePassword(id, dto);

        EntityModel<ApiResponse> response = EntityModel.of(
                new ApiResponse("Password updated successfully"),
                linkTo(methodOn(UserController.class).getUserById(id)).withSelfRel()
        );

        return ResponseEntity.ok(response);
    }

    /* ===================== CHANGE PASSWORD (CURRENT USER) ===================== */
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/me/changePassword")
    public ResponseEntity<EntityModel<ApiResponse>> changePasswordForCurrentUser(
            @RequestBody ResetPasswordDTO dto) {

        Long userId = authUtils.getCurrentUserId();

        userService.updatePassword(userId, dto);

        EntityModel<ApiResponse> response = EntityModel.of(
                new ApiResponse("Password updated successfully"),
                linkTo(methodOn(UserController.class).getCurrentUser()).withSelfRel()
        );

        return ResponseEntity.ok(response);
    }

    /* ===================== DELETE USER ===================== */
    @DeleteMapping("/{id}")
    public ResponseEntity<EntityModel<ApiResponse>> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        EntityModel<ApiResponse> response = EntityModel.of(
                new ApiResponse("User deleted successfully"),
                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users")
        );

        return ResponseEntity.ok(response);
    }

    /* ===================== GET USER BY INTERNAL ID ===================== */
    @GetMapping("/id/{id}")
    public ResponseEntity<EntityModel<GetUserDTO>> getUserById(@PathVariable Long id) {

        GetUserDTO user = userService.getUserById(id);

        EntityModel<GetUserDTO> model = EntityModel.of(
                user,
                linkTo(methodOn(UserController.class).getUserById(id)).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users")
        );

        return ResponseEntity.ok(model);
    }

    /* ===================== GET USER BY PUBLIC ID ===================== */
    @GetMapping("/{publicId}")
    public ResponseEntity<EntityModel<GetUserDTO>> getUserByPublicId(
            @PathVariable String publicId) {

        GetUserDTO user = userService.getUserByPublicId(publicId);

        EntityModel<GetUserDTO> model = EntityModel.of(
                user,
                linkTo(methodOn(UserController.class).getUserByPublicId(publicId)).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users")
        );

        return ResponseEntity.ok(model);
    }

    /* ===================== CURRENT USER ===================== */
    @GetMapping("/me")
    public ResponseEntity<EntityModel<GetUserDTO>> getCurrentUser() {

        Long userId = authUtils.getCurrentUserId();

        GetUserDTO user = userService.getUserById(userId);

        EntityModel<GetUserDTO> model = EntityModel.of(
                user,
                linkTo(methodOn(UserController.class).getCurrentUser()).withSelfRel()
        );

        return ResponseEntity.ok(model);
    }

    /* ===================== GET ALL USERS ===================== */
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<GetUserDTO> usersPage = userService.getAllUsers(pageable);

        List<GetAllUsersDTO> dtos = usersPage.stream()
                .map(user -> new GetAllUsersDTO(
                        user.getId(),
                        user.getFirstName() + " " + user.getLastName(),
                        user.getIdNumber(),
                        user.getPhoneNumber(),
                        user.getProfilePicture(),
                        user.getRole()
                ))
                .toList();

        List<EntityModel<GetAllUsersDTO>> resources = dtos.stream()
                .map(dto -> EntityModel.of(dto,
                        linkTo(methodOn(UserController.class)
                                .getUserById(dto.getId())).withSelfRel()))
                .collect(Collectors.toList());

        PagedModel.PageMetadata metadata =
                new PagedModel.PageMetadata(size, page, usersPage.getTotalElements());

        PagedModel<EntityModel<GetAllUsersDTO>> response =
                PagedModel.of(resources, metadata);

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
        Page<GetUserDTO> usersPage =
                userService.getUsersByRole(parsedRole, pageable);

        List<GetAllUsersDTO> dtos = usersPage.stream()
                .map(user -> new GetAllUsersDTO(
                        user.getId(),
                        user.getFirstName() + " " + user.getLastName(),
                        user.getIdNumber(),
                        user.getPhoneNumber(),
                        user.getProfilePicture(),
                        user.getRole()
                ))
                .toList();

        List<EntityModel<GetAllUsersDTO>> resources = dtos.stream()
                .map(dto -> EntityModel.of(dto,
                        linkTo(methodOn(UserController.class)
                                .getUserById(dto.getId())).withSelfRel()))
                .collect(Collectors.toList());

        PagedModel.PageMetadata metadata =
                new PagedModel.PageMetadata(size, page, usersPage.getTotalElements());

        PagedModel<EntityModel<GetAllUsersDTO>> response =
                PagedModel.of(resources, metadata);

        return ResponseEntity.ok(response);
    }
}