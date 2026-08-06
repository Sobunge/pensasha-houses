package com.pensasha.backend.modules.user;

import com.pensasha.backend.dto.ApiResponse;
import com.pensasha.backend.modules.user.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* ========================= UPDATE USER ========================= */
    @PreAuthorize("hasAuthority('USER_UPDATE') or #id == principal.id")
    @PutMapping("/{id}")
    public ResponseEntity<GetUserDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserDTO dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }

    /* ========================= GET USER BY ID ========================= */
    @PreAuthorize("hasAuthority('USER_VIEW')")
    @GetMapping("/{id}")
    public ResponseEntity<GetUserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    /* ========================= CURRENT USER ========================= */
    @GetMapping("/me")
    public ResponseEntity<GetUserDTO> getCurrentUser(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        return ResponseEntity.ok(userService.getUser(userDetails.getUser().getId()));
    }

    /* ========================= GET ALL USERS ========================= */
    @PreAuthorize("hasAuthority('USER_VIEW')")
    @GetMapping
    public ResponseEntity<Page<GetUserDTO>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.getAll(pageable));
    }

    /* ========================= DELETE USER ========================= */
    @PreAuthorize("hasAuthority('USER_DELETE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse("User deleted"));
    }

    /* ========================= CHANGE PASSWORD ========================= */
    @PutMapping("/me/changePassword")
    public ResponseEntity<ApiResponse> changePassword(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ResetPasswordDTO dto) {

        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }

        userService.updatePassword(userDetails.getUser().getId(), dto);
        return ResponseEntity.ok(new ApiResponse("Password updated successfully"));
    }
}