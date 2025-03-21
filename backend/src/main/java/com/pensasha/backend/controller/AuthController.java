package com.pensasha.backend.controller;

@RestController
@RequestMapping("/api")
public class AuthController {

    //Register
    @PostMapping("/auth/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {}

    //login
    @PostMapping("/auth/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request){}

    //Logout
    @PostMapping("/api/logout")
    public ResponseEntity<String> logout(){
        
    }

    //Token refresh
}
