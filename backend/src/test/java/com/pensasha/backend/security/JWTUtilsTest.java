package com.pensasha.backend.security;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.pensasha.backend.modules.user.CustomUserDetails;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserCredentials;

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
        // Create a mock User and credentials
        User mockUser = new User();
        mockUser.setPhoneNumber("+254707335375");
        mockUser.setRoles(Set.of(Role.ADMIN));

        UserCredentials credentials = new UserCredentials();
        credentials.setUser(mockUser);
        credentials.setPassword("samuel1995");
        credentials.setEnabled(true);
        credentials.setLocked(false);

        // Wrap in CustomUserDetails
        CustomUserDetails userDetails = new CustomUserDetails(credentials);

        // Generate token
        Map<String, String> tokens = jwtUtils.generateTokens(userDetails);
        String accessToken = tokens.get("accessToken");
        assertNotNull(accessToken, "Access token should not be null");

        // Extract username
        String extractedUsername = jwtUtils.extractUsername(accessToken);
        assertEquals("+254707335375", extractedUsername, "Extracted username should match");

        // Validate token
        boolean isValid = jwtUtils.validateToken(accessToken, userDetails);
        assertTrue(isValid, "Token should be valid");
    }
}