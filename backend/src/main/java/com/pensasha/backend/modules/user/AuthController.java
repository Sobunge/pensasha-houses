package com.pensasha.backend.modules.user;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.user.dto.LoginRequestDTO;
import com.pensasha.backend.modules.user.dto.LoginResponseDTO;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.security.CustomUserDetailsService;
import com.pensasha.backend.security.JWTUtils;
import com.pensasha.backend.modules.user.dto.AuthPrincipalDTO;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UserService userService;
    private final CustomUserDetailsService customUserDetailsService;

    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CreateUserDTO userDTO, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(err -> err.getField() + ": " + err.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        if (userService.gettingUser(userDTO.getIdNumber()).isPresent()) {
            EntityModel<CreateUserDTO> userModel = EntityModel.of(userDTO,
                    linkTo(methodOn(UserController.class).gettingUser(userDTO.getIdNumber())).withSelfRel());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(userModel);
        }

        GetUserDTO savedUser = userService.addUser(userDTO);
        EntityModel<GetUserDTO> userModel = EntityModel.of(savedUser,
                linkTo(methodOn(UserController.class).gettingUser(savedUser.getIdNumber())).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

        return ResponseEntity.status(HttpStatus.CREATED).body(userModel);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request,
                                                  BindingResult result,
                                                  HttpServletResponse response) {

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdNumber(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Cast to CustomUserDetails
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        // Generate tokens
        Map<String, String> tokens = jwtUtils.generateTokens(customUserDetails);
        String accessToken = tokens.get("accessToken");
        String refreshToken = tokens.get("refreshToken");

        // Set HttpOnly refresh token cookie
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/api/auth/refresh")
                .maxAge(REFRESH_TOKEN_EXPIRATION_MS / 1000)
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        // Map role → default route
        Role role = customUserDetails.getPrimaryRole();
        String defaultRoute = resolveDefaultRoute(role.name());

        // Build response
        AuthPrincipalDTO principal = new AuthPrincipalDTO(
                customUserDetails.getUser().getId(),
                customUserDetails.getUsername(),
                role.name().toLowerCase(),
                defaultRoute
        );

        LoginResponseDTO responseBody = new LoginResponseDTO(accessToken, principal);

        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(HttpServletRequest request,
                                                            HttpServletResponse response) {
        String refreshToken = Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                .filter(c -> "refreshToken".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Refresh token missing"));
        }

        try {
            String username = jwtUtils.extractUsername(refreshToken);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            if (!jwtUtils.validateToken(refreshToken, userDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid refresh token"));
            }

            String newAccessToken = jwtUtils.generateTokens(userDetails).get("accessToken");

            Map<String, Object> resp = new HashMap<>();
            resp.put("accessToken", newAccessToken);
            resp.put("username", username);
            resp.put("roles", userDetails.getAuthorities().stream().map(a -> a.getAuthority()).toList());

            return ResponseEntity.ok(resp);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid refresh token"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/api/auth/refresh")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    // Private helper to map roles → default routes
    private String resolveDefaultRoute(String roleName) {
        return switch (roleName) {
            case "TENANT" -> "/tenant";
            case "LANDLORD" -> "/landlord";
            case "CARETAKER" -> "/caretaker";
            case "ADMIN" -> "/admin";
            default -> "/";
        };
    }
}
