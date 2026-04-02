package com.pensasha.backend.modules.user;

import com.pensasha.backend.dto.ApiResponse;
import com.pensasha.backend.modules.user.dto.GetAllUsersDTO;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.ResetPasswordDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import com.pensasha.backend.modules.user.helper.RoleResolver;
import com.pensasha.backend.security.AuthUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthUtils authUtils;
    private final RoleResolver roleResolver;

    /* ===================== UPDATE PROFILE ===================== */
    @PreAuthorize("hasAuthority('USER_VIEW') or #id == principal.id")
    @PutMapping("/update/{id}")
    public ResponseEntity<EntityModel<GetUserDTO>> updateProfile(
                    @PathVariable Long id,
                    @Valid @RequestBody UpdateUserDTO updatedUserDTO) {

        GetUserDTO updatedUser = userService.updateUser(id, updatedUserDTO);

        EntityModel<GetUserDTO> model = EntityModel.of(
                        updatedUser,
                        linkTo(methodOn(UserController.class).getUserById(id)).withSelfRel(),
                        linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));

        return ResponseEntity.ok(model);
    }

    /* ===================== CHANGE PASSWORD ===================== */
    @PreAuthorize("#id == principal.id or hasAuthority('USER_VIEW')")
    @PutMapping("/{id}/changePassword")
    public ResponseEntity<EntityModel<ApiResponse>> changePassword(
                    @PathVariable Long id,
                    @RequestBody ResetPasswordDTO dto) {

        userService.updatePassword(id, dto);

        EntityModel<ApiResponse> response = EntityModel.of(
                        new ApiResponse("Password updated successfully"),
                        linkTo(methodOn(UserController.class).getUserById(id)).withSelfRel());

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
                        linkTo(methodOn(UserController.class).getCurrentUser()).withSelfRel());

        return ResponseEntity.ok(response);
    }

    /* ===================== DELETE USER ===================== */
    @PreAuthorize("hasAuthority('USER_VIEW')")
    @DeleteMapping("/{id}")
    public ResponseEntity<EntityModel<ApiResponse>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);

        EntityModel<ApiResponse> response = EntityModel.of(
                        new ApiResponse("User deleted successfully"),
                        linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));

        return ResponseEntity.ok(response);
    }

    /* ===================== GET USER BY INTERNAL ID ===================== */
    @PreAuthorize("hasAuthority('USER_VIEW')")
    @GetMapping("/id/{id}")
    public ResponseEntity<EntityModel<GetUserDTO>> getUserById(@PathVariable Long id) {
        GetUserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(buildUserModel(user));
    }

    /* ===================== GET USER BY PUBLIC ID ===================== */
    @PreAuthorize("hasAuthority('USER_VIEW')")
    @GetMapping("/{publicId}")
    public ResponseEntity<EntityModel<GetUserDTO>> getUserByPublicId(@PathVariable String publicId) {
        GetUserDTO user = userService.getUserByPublicId(publicId);
        return ResponseEntity.ok(buildUserModel(user));
    }

    /* ===================== CURRENT USER ===================== */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<EntityModel<GetUserDTO>> getCurrentUser() {
        Long userId = authUtils.getCurrentUserId();
        GetUserDTO user = userService.getUserById(userId);
        return ResponseEntity.ok(buildUserModel(user));
    }

    /* ===================== GET ALL USERS ===================== */
    @PreAuthorize("hasAuthority('USER_VIEW')")
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getAllUsers(
                    @RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<GetUserDTO> usersPage = userService.getAllUsers(pageable);

        return ResponseEntity.ok(buildPagedUsers(usersPage, page, size));
    }

    /* ===================== GET USERS BY ROLE ===================== */
    @PreAuthorize("hasAuthority('USER_VIEW')")
    @GetMapping("/role/{role}")
    public ResponseEntity<PagedModel<EntityModel<GetAllUsersDTO>>> getUsersByRole(
                    @PathVariable String role,
                    @RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<GetUserDTO> usersPage = userService.getUsersByRole(roleResolver.resolveRole(role), pageable);

        return ResponseEntity.ok(buildPagedUsers(usersPage, page, size));
    }

    /* ===================== HELPER METHODS ===================== */
    private EntityModel<GetUserDTO> buildUserModel(GetUserDTO user) {
        return EntityModel.of(
                        user,
                        linkTo(methodOn(UserController.class).getUserById(user.getId())).withSelfRel(),
                        linkTo(methodOn(UserController.class).getAllUsers(0, 10)).withRel("all-users"));
    }

    private PagedModel<EntityModel<GetAllUsersDTO>> buildPagedUsers(Page<GetUserDTO> usersPage, int page,
                    int size) {
        List<GetAllUsersDTO> dtos = usersPage.stream()
                        .map(user -> new GetAllUsersDTO(
                                        user.getId(),
                                        user.getFirstName() + " " + user.getLastName(),
                                        user.getIdNumber(),
                                        user.getPhoneNumber(),
                                        user.getProfilePicture(),
                                        user.getRoles() // Updated to multi-role Set<Role>
                        ))
                        .toList();

        List<EntityModel<GetAllUsersDTO>> resources = dtos.stream()
                        .map(dto -> EntityModel.of(dto,
                                        linkTo(methodOn(UserController.class)
                                                        .getUserById(dto.getId())).withSelfRel()))
                        .collect(Collectors.toList());

        PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page,
                        usersPage.getTotalElements());

        return PagedModel.of(resources, metadata);
    }
}