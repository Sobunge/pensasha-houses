package com.pensasha.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;

import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JWTAuthenticationFilter.class);
    private static final String TOKEN_PREFIX = "Bearer ";

    private final JWTUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    public JWTAuthenticationFilter(JWTUtils jwtUtils, CustomUserDetailsService userDetailsService) {
        logger.info("JWTAuthenticationFilter initialized.");
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain chain)
            throws ServletException, IOException {

        // 1. Skip CORS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            chain.doFilter(request, response);
            return;
        }

        String path = request.getRequestURI();

        // 2. ================= SKIP ALL PUBLIC AUTH ENDPOINTS =================
        // This ensures register, login, forgot-password, and reset-password 
        // work even if an old expired token is still in the browser headers.
        if (path.startsWith("/api/auth/")) {
            chain.doFilter(request, response);
            return;
        }

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.substring(TOKEN_PREFIX.length());

        try {
            String username = jwtUtils.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtUtils.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.debug("Authenticated user: {} with token ID: {}",
                            username, jwtUtils.extractJti(token));
                }
            }

        } catch (ExpiredJwtException e) {
            // Only block and return 401 for PROTECTED routes.
            // Since we skipped /api/auth/ above, this only hits for secured endpoints.
            logger.warn("Access token expired for request to {}: {}", request.getRequestURI(), e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Access token expired\"}");
            return;

        } catch (Exception e) {
            logger.error("JWT processing failed: {}", e.getMessage(), e);
            // On other errors, we let it fall through to Spring Security's 
            // entry point rather than crashing the filter chain.
        }

        chain.doFilter(request, response);
    }
}