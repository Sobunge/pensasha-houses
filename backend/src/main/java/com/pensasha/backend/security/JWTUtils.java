package com.pensasha.backend.security;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.CustomUserDetails;
import com.pensasha.backend.modules.user.Role;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtils {

    private final String secretKey;

    private static final long ACCESS_TOKEN_EXPIRATION_MS = 15 * 60 * 1000; // 15 min
    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
    private static final long CLOCK_SKEW_MS = 120_000; // 2 minutes

    public JWTUtils(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = secretKey;
    }

    /* ===================== SIGNING KEY ===================== */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /* ===================== TOKEN GENERATION ===================== */
    public Map<String, String> generateTokens(UserDetails userDetails) {
        CustomUserDetails custom = (CustomUserDetails) userDetails;

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", custom.getUser().getId());

        Set<String> roleNames = custom.getUser().getRoles()
                .stream()
                .map(Role::name)
                .collect(Collectors.toSet());
        claims.put("roles", roleNames);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", generateToken(claims, userDetails.getUsername(), ACCESS_TOKEN_EXPIRATION_MS));
        tokens.put("refreshToken", generateToken(claims, userDetails.getUsername(), REFRESH_TOKEN_EXPIRATION_MS));

        return tokens;
    }

     private String generateToken(Map<String, Object> claims, String subject, long expirationMs) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .id(UUID.randomUUID().toString()).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    /* ===================== CLAIM EXTRACTION ===================== */
      private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build().parseSignedClaims(token).getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(extractAllClaims(token));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractJti(String token) {
        return extractClaim(token, Claims::getId);
    }

    public Long extractUserId(String token) {
        return extractClaim(token, claims -> {
            Object val = claims.get("userId");
            if (val instanceof Integer) return ((Integer) val).longValue();
            if (val instanceof Long) return (Long) val;
            return null;
        });
    }

    public Set<String> extractRoles(String token) {
        return extractClaim(token, claims -> {
            Object val = claims.get("roles");
            if (val instanceof Collection<?>) {
                return ((Collection<?>) val).stream().map(Object::toString).collect(Collectors.toSet());
            }
            return Set.of();
        });
    }

    public String extractPrimaryRole(String token) {
        Set<String> roles = extractRoles(token);
        return roles.isEmpty() ? null : roles.iterator().next();
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /* ===================== VALIDATION ===================== */
    public boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        return expiration.before(new Date(System.currentTimeMillis() - CLOCK_SKEW_MS));
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public boolean validateRefreshToken(String token, UserDetails userDetails) {
        // Optionally allow longer skew for refresh tokens
        return extractUsername(token).equals(userDetails.getUsername())
                && !extractExpiration(token).before(new Date(System.currentTimeMillis() - CLOCK_SKEW_MS));
    }
}
