package com.pensasha.backend.user;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Role {

    Admin("ADMIN"), Landlord("LANDLORD"), Caretaker("CARETAKER"), Tenant("TENANT");

    String role;
}
