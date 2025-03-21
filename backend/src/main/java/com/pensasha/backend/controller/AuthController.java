package com.pensasha.backend.controller;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JWTUtils jwtUtils,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    // Register
    @PostMapping("/auth/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {
    }

    // login
    @PostMapping("/auth/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest request, BindingResult result) {

        // Validate input
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid input data");
        }

        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdNumber(), request.getPassword()));

        // Load user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getIdNumber());

        // Generate JWT token
        String token = jwtUtils.generateToken(userDetails);

        return ResponseEntity.ok("{\"token\": \"" + token + "\"}");

    }

    // Logout
    @PostMapping("/api/logout")
    public ResponseEntity<String> logout() {

    }

    // Token refresh
}
