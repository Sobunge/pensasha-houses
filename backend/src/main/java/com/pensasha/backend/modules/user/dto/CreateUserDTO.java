package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO {

    @NotBlank
    @Pattern(regexp = "^[0-9]{7,8}$")
    private String idNumber;

    @NotBlank
    @Size(min = 8)
    private String password;

    @NotNull
    private Role role;
}
