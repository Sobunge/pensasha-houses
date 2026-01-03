package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserDTO {

    private String firstName;
    private String middleName;
    private String lastName;
    private String idNumber;
    private String phoneNumber;
    private String profilePicture;
    private Role role;

}
