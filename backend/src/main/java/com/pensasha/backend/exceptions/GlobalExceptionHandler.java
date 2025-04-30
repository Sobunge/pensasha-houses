package com.pensasha.backend.exceptions;

import jakarta.validation.ConstraintViolationException;  // Import for constraint violation exception
import org.springframework.http.HttpStatus;  // Import for HTTP status codes
import org.springframework.http.ResponseEntity;  // Import for creating response entities
import org.springframework.web.bind.MethodArgumentNotValidException;  // Import for method argument validation exception
import org.springframework.web.bind.annotation.ExceptionHandler;  // Import for handling exceptions in controllers
import org.springframework.web.bind.annotation.RestControllerAdvice;  // Import for global exception handling

import java.util.List;  // Import for working with lists
import java.util.stream.Collectors;  // Import for stream operations to collect errors

// Global exception handler class to handle and respond to exceptions globally in the application
@RestControllerAdvice  // This annotation allows the class to handle exceptions thrown by any controller
public class GlobalExceptionHandler {

    // Handle validation errors from @Valid in controllers
    @ExceptionHandler(MethodArgumentNotValidException.class)  // This annotation indicates that this method will handle MethodArgumentNotValidException
    public ResponseEntity<?> handleConstrainsValidation(ConstraintViolationException ex) {

        // Extracts validation errors from the exception and maps them to a list of error messages
        List<String> errors = ex.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ":" + violation.getMessage())  // Extracts the property path and the error message
                .collect(Collectors.toList());  // Collects all error messages into a list

        // Responds with a bad request (400) and the list of validation error messages
        return ResponseEntity.badRequest().body(errors);
    }

    // Handle Hibernate validation errors (ConstraintViolationException)
    @ExceptionHandler(ConstraintViolationException.class)  // This annotation indicates that this method will handle ConstraintViolationException
    public ResponseEntity<List<String>> handleConstraintViolation(ConstraintViolationException ex) {
        // Extracts validation errors from the exception and maps them to a list of error messages
        List<String> errors = ex.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())  // Extracts the property path and the error message
                .collect(Collectors.toList());  // Collects all error messages into a list

        // Responds with a bad request (400) and the list of validation error messages
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

}
