package com.pensasha.backend.exceptions;

// Custom exception class that extends RuntimeException
// This exception is thrown when a requested resource is not found
public class ResourceNotFoundException extends RuntimeException {

    // Constructor that accepts a message and passes it to the superclass (RuntimeException)
    public ResourceNotFoundException(String message) {
        super(message);  // Calls the constructor of RuntimeException with the provided message
    }
}
