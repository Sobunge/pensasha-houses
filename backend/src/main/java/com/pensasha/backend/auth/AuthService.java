package com.pensasha.backend.auth;

import com.pensasha.backend.auth.token.RefreshToken;
import com.pensasha.backend.auth.token.RefreshTokenService;
import com.pensasha.backend.auth.userCredentials.UserCredentials;
import com.pensasha.backend.auth.userCredentials.UserCredentialsService;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserService;
import com.pensasha.backend.modules.user.dto.AuthResponseDTO;
import com.pensasha.backend.modules.user.dto.LoginRequestDTO;
import com.pensasha.backend.modules.user.CustomUserDetails;
import com.pensasha.backend.security.CustomUserDetailsService;
import com.pensasha.backend.security.JWTUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

        private static final long REFRESH_EXPIRY = 7 * 24 * 60 * 60; // 7 days

        private final AuthenticationManager authenticationManager;
        private final JWTUtils jwtUtils;
        private final UserService userService;
        private final UserCredentialsService userCredentialsService;
        private final RefreshTokenService refreshTokenService;
        private final CustomUserDetailsService userDetailsService;
        private final AuthPrincipalFactory authPrincipalFactory;

        /* ========================= REGISTER ========================= */

        public AuthResponseDTO register(CreateUserDTO dto,
                        HttpServletResponse response) {

                User user = userService.createUser(dto);

                UserCredentials credentials = userCredentialsService.create(user, dto.getPassword());

                CustomUserDetails userDetails = new CustomUserDetails(credentials);

                String accessToken = generateAccessToken(userDetails);

                String refreshToken = refreshTokenService.create(user);

                setRefreshCookie(response, refreshToken);

                return buildAuthResponse(accessToken, user);
        }

        /* ========================= LOGIN ========================= */

        public AuthResponseDTO login(LoginRequestDTO dto,
                        HttpServletResponse response) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                dto.getPhoneNumber(),
                                                dto.getPassword()));

                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

                String accessToken = generateAccessToken(userDetails);

                String refreshToken = refreshTokenService.create(userDetails.getUser());

                setRefreshCookie(response, refreshToken);

                return buildAuthResponse(accessToken, userDetails.getUser());
        }

        /* ========================= REFRESH ========================= */

        public AuthResponseDTO refresh(HttpServletRequest request, HttpServletResponse response) {

                String refreshToken = extractRefreshToken(request);

                if (refreshToken == null || refreshToken.isBlank()) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing refresh token.");
                }

                RefreshToken token = refreshTokenService.findByToken(refreshToken);

                // 1. Validate Token Exists
                if (token == null) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token.");
                }

                // 2. Validate Expiration
                if (refreshTokenService.isExpired(token)) {
                        refreshTokenService.deleteByToken(refreshToken);
                        clearRefreshCookie(response);
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token has expired.");
                }

                User user = token.getUser();
                if (user == null) {
                        refreshTokenService.deleteByToken(refreshToken);
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found.");
                }

                // 3. DO NOT DELETE OR ROTATE REFRESH TOKEN HERE.
                // Simply fetch UserDetails and issue a fresh Access Token for React memory.
                CustomUserDetails userDetails = (CustomUserDetails) userDetailsService
                                .loadUserByUsername(user.getPhoneNumber());

                String accessToken = generateAccessToken(userDetails);

                return buildAuthResponse(accessToken, user);
        }

        /* ========================= LOGOUT ========================= */

        @Transactional
        public void logout(HttpServletRequest request, HttpServletResponse response) {

                String refreshToken = extractRefreshToken(request);

                // 1. Attempt DB deletion, but don't let a missing token crash the request
                if (refreshToken != null && !refreshToken.isBlank()) {
                        try {
                                refreshTokenService.deleteByToken(refreshToken);
                        } catch (Exception e) {
                                // Log warning, but allow execution to proceed to cookie clearing
                                log.warn("Refresh token deletion failed or token not found: {}", e.getMessage());
                        }
                }

                // 2. ALWAYS clear the browser cookie regardless of DB state
                ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                                .httpOnly(true)
                                .secure(false) // Remember to change to true in production (HTTPS)
                                .sameSite("Lax") // Must match your login cookie setting!
                                .path("/")
                                .maxAge(0)
                                .build();

                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        /* ========================= PRIVATE HELPERS ========================= */

        private AuthResponseDTO buildAuthResponse(String accessToken,
                        User user) {

                return new AuthResponseDTO(
                                accessToken,
                                authPrincipalFactory.create(user));
        }

        private String generateAccessToken(CustomUserDetails userDetails) {

                return jwtUtils.generateTokens(userDetails)
                                .get("accessToken");
        }

        private void setRefreshCookie(HttpServletResponse response,
                        String refreshToken) {

                ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                                .httpOnly(true)
                                .secure(false) // true in production
                                .sameSite("Lax")
                                .path("/")
                                .maxAge(REFRESH_EXPIRY)
                                .build();

                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        private String extractRefreshToken(HttpServletRequest request) {

                if (request.getCookies() == null) {
                        return null;
                }

                return Arrays.stream(request.getCookies())
                                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                                .map(cookie -> cookie.getValue())
                                .findFirst()
                                .orElse(null);
        }

        private void clearRefreshCookie(HttpServletResponse response) {
                ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .maxAge(0) // Immediately expires the cookie
                                .sameSite("Lax")
                                .build();

                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }
}