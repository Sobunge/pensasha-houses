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

@Configuration // Marks the class as a configuration class for Spring
@EnableWebSecurity // Enables Spring Security for the application
@RequiredArgsConstructor // Automatically generates a constructor with required arguments (dependencies)
public class WebSecurityConfig {

    private final JWTAuthenticationFilter jwtAuthenticationFilter; // JWT filter to intercept and authenticate requests

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disables CSRF protection, since the application is stateless
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless
                                                                                                              // session
                                                                                                              // management
                                                                                                              // for a
                                                                                                              // RESTful
                                                                                                              // API
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Adds the JWT
                                                                                                      // authentication
                                                                                                      // filter before
                                                                                                      // the standard
                                                                                                      // username/password
                                                                                                      // filter
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll() // Allows unauthenticated
                                                                                              // access to registration
                                                                                              // and login
                        .anyRequest().authenticated() // Requires authentication for all other requests
                )
                .logout(logout -> logout
                        .logoutUrl("/user/logout") // URL for logging out the user
                        .logoutSuccessHandler(this::logoutSuccessHandler)); // Handles the success of the logout process

        return http.build(); // Builds the SecurityFilterChain with the defined configuration
    }

    // Custom logout success handler, returns a success message in JSON format
    private void logoutSuccessHandler(HttpServletRequest request, HttpServletResponse response,
            org.springframework.security.core.Authentication authentication)
            throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"message\": \"Logout successful\"}"); // Sends a logout success message in
                                                                            // response
        response.getWriter().flush(); // Flushes the output to the client
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        // Configures and returns the AuthenticationManager for the security
        // configuration
        return http.getSharedObject(AuthenticationManagerBuilder.class).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Returns a password encoder (BCryptPasswordEncoder) for encoding user
        // passwords
        return new BCryptPasswordEncoder();
    }
}
