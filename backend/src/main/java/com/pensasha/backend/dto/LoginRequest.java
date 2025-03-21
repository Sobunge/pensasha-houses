package com.pensasha.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "ID Number is required")
    private String idNumber;

    @NotBlank(message = "Password is required")
    private String password;
}
