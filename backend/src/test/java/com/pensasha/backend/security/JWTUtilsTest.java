package com.pensasha.backend.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

@SpringBootTest
public class JWTUtilsTest {

    @Autowired
    private JWTUtils jwtUtils;

    @Test
    void testGenerateAndValidateToken() {
        // 1. Create mock user details
        UserDetails userDetails = User.withUsername("sobunge")
            .password("samuel1995")
            .roles("ADMIN")
            .build();

        // 2. Generate tokens (access + refresh)
        Map<String, String> tokens = jwtUtils.generateTokens(userDetails);
        String accessToken = tokens.get("accessToken");
        assertNotNull(accessToken, "Access token should not be null");

        // 3. Extract username from access token
        String extractedUsername = jwtUtils.extractUsername(accessToken);
        assertEquals("sobunge", extractedUsername, "Username extracted should match original");

        // 4. Validate access token
        boolean isValid = jwtUtils.validateToken(accessToken, userDetails);
        assertTrue(isValid, "Token should be valid");
    }
}
