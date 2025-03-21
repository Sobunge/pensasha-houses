package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tenants")
@Getter
@Setter
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
