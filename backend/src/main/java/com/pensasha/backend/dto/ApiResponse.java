package com.pensasha.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// Lombok annotation to generate getter, setter, toString, equals, and hashCode methods automatically
@Data 
// Lombok annotation to generate a constructor with all arguments
@AllArgsConstructor 
public class ApiResponse {

    // A message to be returned in the API response, typically used for success/error messages
    private String message;
}
