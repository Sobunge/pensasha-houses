package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllUsersDTO {

    private String fullName;
    private String idNumber;
    private String phoneNumber;
    private String profilePicture;
    private Role role;

}
