package com.pensasha.backend.modules.user.caretaker;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class CaretakerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ===================== RELATION TO USER ===================== */

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /* ===================== CARETAKER SPECIFIC FIELDS ===================== */

    /**
     * The property assigned to this caretaker.
     * Multiple caretakers can be assigned to a property if needed.
     */
    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property assignedProperty;
}
