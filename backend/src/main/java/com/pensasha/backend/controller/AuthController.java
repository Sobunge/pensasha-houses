package com.pensasha.backend.controller;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService userDetailsService;

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
