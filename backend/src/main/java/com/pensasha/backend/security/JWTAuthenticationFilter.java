package com.pensasha.backend.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

// This class is a custom filter that intercepts HTTP requests to check for JWT authentication.
@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    // Inject dependencies: JWT utility class and custom user details service
    private final JWTUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;
    
    // Logger for debugging and information logging
    private static final Logger logger = LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    // Constructor for injecting JWTUtils and CustomUserDetailsService dependencies
    public JWTAuthenticationFilter(JWTUtils jwtUtils, CustomUserDetailsService userDetailsService) {
        logger.info("JWTAuthenticationFilter initialized.");
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    // This method processes the request, extracting and validating the JWT token
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response, @NonNull FilterChain chain)
            throws ServletException, IOException {

        // Extract the Authorization header from the request
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        // If the header is missing or doesn't start with "Bearer", pass the request along the filter chain
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        // Extract the token by removing the "Bearer " prefix
        String token = header.substring(7);
        // Extract the username from the token
        String username = jwtUtils.extractUsername(token);

        // If a username is found and the user is not already authenticated in the SecurityContext
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load the user details using the custom user details service
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Validate the token with the user details
            if (jwtUtils.validateToken(token, userDetails)) {
                // If the token is valid, create an authentication token and set it in the SecurityContext
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue with the filter chain to pass the request along
        chain.doFilter(request, response);
    }
}
