package com.pensasha.backend.modules.user.caretaker;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

/**
 * Entity class representing a CareTaker user.
 * Inherits from the {@link User} entity and adds a relationship to a property
 * the caretaker is assigned to.
 * Mapped to the 'caretakers' table in the database.
 */
@Entity
@Table(name = "caretakers")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Caretaker extends User {

    /**
     * The property assigned to this caretaker.
     * Represents a many-to-one relationship where multiple caretakers can be
     * assigned to a property,
     * though typically one caretaker manages one property.
     */
    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property assignedProperty;

}
