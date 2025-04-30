package com.pensasha.backend.utils;

import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

public class ValidationUtil {

    // This method extracts validation errors from a BindingResult and returns them as a list of error messages
    public static List<String> getValidationErrors(BindingResult bindingResult) {
        // Get all field errors from the BindingResult, map them to a readable error message format, 
        // and collect the results into a List<String>
        return bindingResult.getFieldErrors().stream()
                // For each error, combine the field name and its associated default message
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                // Collect the mapped error messages into a List
                .collect(Collectors.toList());
    }
}
