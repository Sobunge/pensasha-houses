package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthPrincipalDTO {

    private Long id;
    private String username;   // phone number
    private Role role; 
    private String defaultRoute; 
}