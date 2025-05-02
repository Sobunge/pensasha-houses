package com.pensasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invoice_sequence")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceSequence {

    @Id
    private Long id = 1L; // we’ll always have one row with id=1

    @Column(nullable = false)
    private Long lastNumber;
}