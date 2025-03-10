package com.pensasha.backend.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "tenants")
@NoArgsConstructor
@AllArgsConstructor
public class Tenant extends User {

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit rentalUnit;

    @NotBlank(message = "Lease start date is required")
    private String leaseStartDate;

    @NotBlank(message = "Lease end date is required")
    private String leaseEndDate;

    @NotNull(message = "Monthly rent is required")
    @Positive(message = "Rent amount must be a positive number")
    private Double monthlyRent;

    @NotBlank(message = "Emergency contact is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid emergency contact number")
    private String emergencyContact;
}
