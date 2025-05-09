package com.pensasha.backend.modules.user.dto;

import com.pensasha.backend.modules.user.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserDTO {

    private String firstName;
    private String secondName;
    private String thirdName;
    private String idNumber;
    private String phoneNumber;
    private String profilePicture;
    private Role role;

}
