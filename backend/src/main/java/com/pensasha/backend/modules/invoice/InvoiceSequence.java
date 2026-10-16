package com.pensasha.backend.modules.invoice;

// Import necessary annotations and classes
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Entity class representing the invoice number sequence tracker.
 * 
 * This entity is used to keep track of the last generated invoice number.
 * It ensures invoice numbers increment consistently across the system.
 */
@Entity
@Table(name = "invoice_sequence") // Specifies the table name in the database
@Getter
@Setter
@AllArgsConstructor
public class InvoiceSequence {

    /**
     * Primary key for the invoice_sequence table.
     * 
     * We’ll always have one row in this table with id=1.
     * This acts as a singleton tracker for the invoice number sequence.
     */
    @Id
    private Long id;

    /**
     * Holds the value of the last generated invoice number.
     * 
     * This value increments each time a new invoice is created.
     * The 'nullable = false' constraint ensures this value is always set.
     */
    @Column(nullable = false)
    private Long lastNumber;

    /**
     * No-args constructor setting the default id to 1L.
     */
    public InvoiceSequence() {
        this.id = 1L;
    }
}