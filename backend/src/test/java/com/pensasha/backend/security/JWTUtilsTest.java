package com.pensasha.backend.security;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

class JWTUtilsTest {

    private JWTUtils jwtUtils;

    @BeforeEach
    void setUp() {
        // Base64-encoded secret (must be ≥ 32 bytes after decoding)
        String testSecret = "dGVzdC1zZWNyZXQtdGVzdC1zZWNyZXQtdGVzdC1zZWNyZXQ=";
        jwtUtils = new JWTUtils(testSecret);
    }

    @Test
    void testGenerateAndValidateToken() {
        // 1. Create a mock user
        UserDetails userDetails = User.withUsername("sobunge")
                .password("samuel1995")
                .roles("ADMIN")
                .build();

        // 2. Generate tokens
        Map<String, String> tokens = jwtUtils.generateTokens(userDetails);
        String accessToken = tokens.get("accessToken");
        assertNotNull(accessToken, "Access token should not be null");

        // 3. Extract username and validate token
        String extractedUsername = jwtUtils.extractUsername(accessToken);
        assertEquals("sobunge", extractedUsername, "Extracted username should match");

        boolean isValid = jwtUtils.validateToken(accessToken, userDetails);
        assertTrue(isValid, "Token should be valid");
    }
}
