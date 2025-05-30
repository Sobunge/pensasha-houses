package com.pensasha.backend.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.pensasha.backend.security.JWTAuthenticationFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration // Indicates this is a Spring configuration class
@EnableWebSecurity // Enables Spring Security features for the application
@RequiredArgsConstructor // Generates a constructor with required (final) fields
public class WebSecurityConfig {

    // Dependency injection of the custom JWT authentication filter
    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Defines the security filter chain for handling HTTP security.
     * 
     * @param http HttpSecurity instance for configuring security settings.
     * @return Configured SecurityFilterChain.
     * @throws Exception if configuration fails.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF protection since we're using stateless sessions with JWT
                .csrf(csrf -> csrf.disable())

                // Configure session management to be stateless (no HTTP sessions)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Add the JWT authentication filter before the default
                // UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // Define public and protected routes
                .authorizeHttpRequests(auth -> auth
                        // Allow unauthenticated access to registration and login endpoints
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                        // All other requests require authentication
                        .anyRequest().authenticated())

                // Configure logout handling
                .logout(logout -> logout
                        // Define the logout URL endpoint
                        .logoutUrl("/user/logout")
                        // Specify a custom logout success handler
                        .logoutSuccessHandler(this::logoutSuccessHandler));

        // Return the configured security filter chain
        return http.build();
    }

    /**
     * Custom handler for successful logout events.
     * Sends a simple JSON message to the client on successful logout.
     * 
     * @param request        HTTP request
     * @param response       HTTP response
     * @param authentication Current authentication context
     * @throws IOException      if there's a response error
     * @throws ServletException if there's a servlet error
     */
    private void logoutSuccessHandler(HttpServletRequest request, HttpServletResponse response,
            org.springframework.security.core.Authentication authentication)
            throws IOException, ServletException {
        response.setContentType("application/json"); // Set response content type to JSON
        response.setStatus(HttpServletResponse.SC_OK); // Set HTTP status to 200 OK
        response.getWriter().write("{\"message\": \"Logout successful\"}"); // Send JSON response body
        response.getWriter().flush(); // Flush the response stream
    }

    /**
     * Defines and configures the AuthenticationManager bean.
     * 
     * @param http HttpSecurity instance
     * @return Configured AuthenticationManager.
     * @throws Exception if configuration fails.
     */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        // Build and return the AuthenticationManager from the shared HttpSecurity
        // object
        return http.getSharedObject(AuthenticationManagerBuilder.class).build();
    }

    /**
     * Defines the password encoder bean used for hashing passwords.
     * 
     * @return PasswordEncoder instance using BCrypt algorithm.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt hashing for password encryption
    }
}
