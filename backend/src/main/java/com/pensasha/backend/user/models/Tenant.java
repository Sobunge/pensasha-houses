package com.pensasha.backend.user.models;

import com.pensasha.backend.houses.Unit;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "tenants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tenant extends User {

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit rentalUnit;
    private String leaseStartDate;
    private String leaseEndDate;
    private Double monthlyRent;
    private String emergencyContact;
}
