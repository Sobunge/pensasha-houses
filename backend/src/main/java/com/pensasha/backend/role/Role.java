package com.pensasha.backend.role;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Role {

    Admin("ADMIN"), Landlord("LANDLORD"), Caretaker("CARETAKER"), Tenant("TENANT");

    String role;
}
