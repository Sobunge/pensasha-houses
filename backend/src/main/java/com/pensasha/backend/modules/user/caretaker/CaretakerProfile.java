package com.pensasha.backend.modules.user.caretaker;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Role-specific profile for a Caretaker.
 * Contains caretaker-only attributes and links to User identity.
 */
@Entity
@Table(name = "caretaker_profiles")
@Getter
@Setter
@NoArgsConstructor
public class CaretakerProfile {

    /* ===================== INTERNAL ID ===================== */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ===================== RELATION TO USER ===================== */

    /**
     * Each caretaker profile belongs to exactly one user.
     */
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /* ===================== CARETAKER SPECIFIC FIELDS ===================== */

    /**
     * The property assigned to this caretaker.
     * Multiple caretakers can be assigned to the same property if needed.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property assignedProperty;

    /* ===================== HELPER METHODS ===================== */

    public void setUser(User user) {
        this.user = user;
    }

    public void assignProperty(Property property) {
        this.assignedProperty = property;
    }

    public void removePropertyAssignment() {
        this.assignedProperty = null;
    }
}