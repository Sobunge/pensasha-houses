package com.pensasha.backend.exceptions;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    public ResponseEntity<?> handleConstrainsValidation(ConstraintViolationException ex){

        List<String> errors = ex.getConstraintViolations().stream()
            .map(violation -> violation.getPropertyPath() + ":" + violation.getMessage())
            .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(errors);
    }

}
