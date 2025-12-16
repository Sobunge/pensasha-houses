package com.pensasha.backend.modules.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthPrincipalDTO {

    private Long id;
    private String username;
    private String role;
    private String defaultRoute;
}
