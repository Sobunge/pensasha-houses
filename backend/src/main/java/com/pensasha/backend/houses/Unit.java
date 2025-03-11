package com.pensasha.backend.houses;

import com.pensasha.backend.user.models.Tenant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "units")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Unit number is required")
    private String unitNumber;

    @NotNull(message = "Rent amount is required")
    @Positive(message = "Rent amount must be a positive number")
    private Double rentAmount;

    @NotNull(message = "Occupancy status is required")
    private Boolean isOccupied;

    @ManyToOne
    @JoinColumn(name = "propery_id")
    private Property property;

    @OneToOne(mappedBy = "rentalUnit")
    private Tenant tenant;
}
