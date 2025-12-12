package com.pensasha.backend.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JWTUtils {

    @Value("${jwt.secret}")
    private String secretKey;

    private static final long ACCESS_TOKEN_EXPIRATION_MS = 15 * 60 * 1000; // 15 minutes
    private static final long REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /** Generate both access and refresh tokens for a user */
    public Map<String, String> generateTokens(UserDetails userDetails) {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", generateToken(userDetails.getUsername(), ACCESS_TOKEN_EXPIRATION_MS));
        tokens.put("refreshToken", generateToken(userDetails.getUsername(), REFRESH_TOKEN_EXPIRATION_MS));
        return tokens;
    }

    /** Core token generation method */
    private String generateToken(String username, long expirationMs) {
        String jti = UUID.randomUUID().toString(); // unique token ID for revocation tracking
        return Jwts.builder()
                .setSubject(username)
                .setId(jti)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /** Extract all claims from a JWT */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /** Generic claim extractor */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    /** Extract username (subject) from token */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /** Extract token ID (jti) */
    public String extractJti(String token) {
        return extractClaim(token, Claims::getId);
    }

    /** Extract token expiration date */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /** Check if token is expired */
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /** Validate token against user details and expiration */
    public boolean validateToken(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /** Optional: separate validation for refresh token if needed */
    public boolean validateRefreshToken(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
