package com.pensasha.backend.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtils {

    private final String secretKey;

    private static final long ACCESS_TOKEN_EXPIRATION_MS = 15 * 60 * 1000; // 15 minutes
    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

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
        claims.put("role", custom.getPrimaryRole().name());

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", generateToken(claims, userDetails.getUsername(), ACCESS_TOKEN_EXPIRATION_MS));
        tokens.put("refreshToken", generateToken(claims, userDetails.getUsername(), REFRESH_TOKEN_EXPIRATION_MS));

        return tokens;
    }

    private String generateToken(
            Map<String, Object> claims,
            String subject,
            long expirationMs) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject) // phone number
                .id(UUID.randomUUID().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    /* ===================== CLAIM EXTRACTION ===================== */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
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
            if (val instanceof Integer)
                return ((Integer) val).longValue();
            if (val instanceof Long)
                return (Long) val;
            return null;
        });
    }

    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /* ===================== VALIDATION ===================== */
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    public boolean validateRefreshToken(String token, UserDetails userDetails) {
        return validateToken(token, userDetails);
    }
}
