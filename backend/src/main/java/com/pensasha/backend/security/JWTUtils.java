package com.pensasha.backend.security;

import java.util.Date;
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

    // The secret key used for signing JWT tokens is fetched from application properties
    @Value("${jwt.secret}")
    private String secretKey;

    // Token expiration time set to 1 day (in milliseconds)
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    // Generate a SecretKey from the base64 encoded secret key
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // Decode the secret key from base64 format
        return Keys.hmacShaKeyFor(keyBytes); // Return a secret key for HMAC signing algorithm
    }

    // Generate a JWT token using user details (username)
    public String generateToken(UserDetails userDetails) {
        // Build the JWT token with the subject, issue date, expiration date, and signature
        return Jwts.builder()
                .setSubject(userDetails.getUsername()) // Set the username as the subject of the token
                .setIssuedAt(new Date()) // Set the issued date to the current time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Set the expiration date
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Sign the token using HMAC SHA-256 algorithm
                .compact(); // Return the compact JWT string
    }

    // Validate the provided token by comparing the username and checking if it's expired
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token); // Extract the username from the token
        // Return true if the username matches and the token is not expired
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Extract the username (subject) from the JWT token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // Extract the subject from the claims in the token
    }

    // Extract the expiration date of the token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration); // Extract the expiration date from the claims
    }

    // Extract a specific claim from the token by using a function
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token); // Extract all claims from the token
        return claimsResolver.apply(claims); // Return the resolved claim
    }

    // Extract all claims from the JWT token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey()) // Set the signing key for token parsing
                .build()
                .parseClaimsJws(token) // Parse the JWT token
                .getBody(); // Return the body (claims) of the parsed token
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()); // Compare the expiration date with the current date
    }
}
