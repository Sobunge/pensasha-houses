package com.pensasha.backend.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
    void testGenerateAndValidateToken(){
        
        // 1. Create mock user details
        UserDetails userDetails = User.withUsername("sobunge")
            .password("samuel1995")
            .roles("ADMIN")
            .build();

        // 2. Generate token
        String token = jwtUtils.generateToken(userDetails);
        assertNotNull(token);

        // 3. Extract username
        String extractedUsername = jwtUtils.extractUsername(token);
        assertEquals("sobunge", extractedUsername, "Username extracted should match original");

        // 4. Validate token
        boolean isValid = jwtUtils.validateToken(token, userDetails);
        assertTrue(isValid, "Token should be true");

    }
}
