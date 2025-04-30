package com.pensasha.backend.utils;

import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

public class ValidationUtil {

    public static List<String> getValidationErrors(BindingResult bindingResult) {
        return bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
    }
}