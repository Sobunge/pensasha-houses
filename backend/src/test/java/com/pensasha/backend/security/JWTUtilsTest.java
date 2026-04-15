package com.pensasha.backend.security;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.pensasha.backend.auth.userCredentials.UserCredentials;
import com.pensasha.backend.modules.user.CustomUserDetails;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.User;

class JWTUtilsTest {

    private JWTUtils jwtUtils;

    @BeforeEach
    void setUp() {
        // Base64-encoded secret (≥ 32 bytes after decoding)
        String testSecret = "dGVzdC1zZWNyZXQtdGVzdC1zZWNyZXQtdGVzdC1zZWNyZXQ=";
        jwtUtils = new JWTUtils(testSecret);
    }

    @Test
    void generateAndValidateToken_ShouldSucceed() {
        // Arrange: create a mock Role instance
        Role adminRole = new Role();
        adminRole.setId(1L);
        adminRole.setName("ADMIN");

        // Mock user with roles
        User mockUser = new User();
        mockUser.setId(100L); // important for token claim extraction
        mockUser.setPhoneNumber("+254707335375");
        mockUser.setRoles(Set.of(adminRole));

        UserCredentials credentials = new UserCredentials();
        credentials.setUser(mockUser);
        credentials.setPassword("samuel1995");
        credentials.setEnabled(true);
        credentials.setLocked(false);

        CustomUserDetails userDetails = new CustomUserDetails(credentials);

        // Act: generate tokens
        Map<String, String> tokens = jwtUtils.generateTokens(userDetails);
        String accessToken = tokens.get("accessToken");
        String refreshToken = tokens.get("refreshToken");

        // Assert: tokens are generated
        assertNotNull(accessToken, "Access token should not be null");
        assertNotNull(refreshToken, "Refresh token should not be null");

        // Extract claims
        String extractedUsername = jwtUtils.extractUsername(accessToken);
        Set<String> extractedRoles = jwtUtils.extractRoles(accessToken);
        Long extractedUserId = jwtUtils.extractUserId(accessToken);

        // Assert: claims match expected values
        assertEquals(mockUser.getPhoneNumber(), extractedUsername, "Username should match");
        assertEquals(Set.of("ADMIN"), extractedRoles, "Roles should match"); // mapped to String
        assertEquals(mockUser.getId(), extractedUserId, "User ID should match");

        // Validate tokens
        assertTrue(jwtUtils.validateToken(accessToken, userDetails), "Access token should be valid");
        assertTrue(jwtUtils.validateRefreshToken(refreshToken, userDetails), "Refresh token should be valid");
    }
}