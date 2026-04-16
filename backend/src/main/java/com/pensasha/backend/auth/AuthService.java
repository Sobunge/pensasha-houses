package com.pensasha.backend.auth;

import com.pensasha.backend.auth.token.RefreshToken;
import com.pensasha.backend.auth.token.RefreshTokenService;
import com.pensasha.backend.auth.userCredentials.UserCredentials;
import com.pensasha.backend.auth.userCredentials.UserCredentialsService;
import com.pensasha.backend.modules.user.*;
import com.pensasha.backend.modules.user.dto.*;
import com.pensasha.backend.modules.user.mapper.UserMapper;
import com.pensasha.backend.security.CustomUserDetailsService;
import com.pensasha.backend.security.JWTUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UserMapper userMapper;
    private final CustomUserDetailsService userDetailsService;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final AuthPrincipalFactory authPrincipalFactory;
    private final UserCredentialsService userCredentialsService;

    private static final long REFRESH_EXPIRY = 7 * 24 * 60 * 60; // seconds

    /* ========================= REGISTER ========================= */
    public Map<String, Object> register(CreateUserDTO dto, HttpServletResponse response) {

        User user = userService.createUser(dto);

        UserCredentials credentials =
                userCredentialsService.create(user, dto.getPassword());

        CustomUserDetails userDetails = new CustomUserDetails(credentials);

        String accessToken = jwtUtils.generateTokens(userDetails).get("accessToken");

        String refreshToken = refreshTokenService.create(user);

        setRefreshCookie(response, refreshToken);

        return Map.of(
                "accessToken", accessToken,
                "user", userMapper.toDTO(user),
                "principal", authPrincipalFactory.create(user)
        );
    }

    /* ========================= LOGIN ========================= */
    public Map<String, Object> login(LoginRequestDTO dto, HttpServletResponse response) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getPhoneNumber(),
                        dto.getPassword()
                )
        );

        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();

        String accessToken = jwtUtils.generateTokens(userDetails).get("accessToken");

        // multi-session: create new refresh token, DO NOT overwrite others
        String refreshToken =
                refreshTokenService.create(userDetails.getUser());

        setRefreshCookie(response, refreshToken);

        return Map.of(
                "accessToken", accessToken,
                "principal", authPrincipalFactory.create(userDetails.getUser())
        );
    }

    /* ========================= REFRESH ========================= */
    public LoginResponseDTO refresh(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = extractRefreshToken(request);

        if (refreshToken == null) {
            throw new IllegalStateException("Missing refresh token");
        }

        RefreshToken token =
                refreshTokenService.findByToken(refreshToken);

        if (token.isExpired()) {
            refreshTokenService.deleteByToken(refreshToken);
            throw new IllegalStateException("Refresh token expired");
        }

        User user = token.getUser();

        // 🔥 ROTATION (CRITICAL SECURITY IMPROVEMENT)
        refreshTokenService.deleteByToken(refreshToken);
        String newRefreshToken = refreshTokenService.create(user);

        CustomUserDetails userDetails =
                (CustomUserDetails) userDetailsService.loadUserByUsername(user.getPhoneNumber());

        String newAccessToken =
                jwtUtils.generateTokens(userDetails).get("accessToken");

        setRefreshCookie(response, newRefreshToken);

        return new LoginResponseDTO(
                newAccessToken,
                authPrincipalFactory.create(user)
        );
    }

    /* ========================= LOGOUT ========================= */
    public void logout(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = extractRefreshToken(request);

        if (refreshToken != null) {
            refreshTokenService.deleteByToken(refreshToken);
        }

        // clear cookie
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /* ========================= HELPERS ========================= */
    private void setRefreshCookie(HttpServletResponse response, String token) {

    ResponseCookie cookie = ResponseCookie.from("refreshToken", token)
            .httpOnly(true)
            .secure(false) // set false in local dev if needed and true in prod
            .path("/")
            .sameSite("lax") // 🔥 critical for cross-origin and none in prod
            .maxAge(REFRESH_EXPIRY)
            .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
}

    private String extractRefreshToken(HttpServletRequest request) {

        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(c -> "refreshToken".equals(c.getName()))
                .map(c -> c.getValue())
                .findFirst()
                .orElse(null);
    }
}