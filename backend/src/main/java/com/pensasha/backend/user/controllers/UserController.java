package com.pensasha.backend.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(name = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Adding a new user (Admin)

    // Editing user details (Admin)

    // Deleting a user (Admin)

    // Getting a single user (Admin)

    // Getting all users (Admin)

}