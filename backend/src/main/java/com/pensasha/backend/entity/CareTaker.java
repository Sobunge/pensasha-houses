package com.pensasha.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "caretakers")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CareTaker extends User {

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property assignedProperty;

}
