package com.pensasha.backend.role;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Role {

    ADMIN("ADMIN"), LANDLORD("LANDLORD"), CARETAKER("CARETAKER"), TENANT("TENANT");

    String role;
}
