package com.pensasha.backend.modules.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Base entity representing a system user.
 * This class holds identity and profile-related data only.
 *
 * Authentication, authorization, and credentials should be handled
 * in a separate entity (e.g. UserCredentials).
 *
 * Subclasses include Tenant, Landlord, and Caretaker.
 */
@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "id_number"),
        @UniqueConstraint(columnNames = "phone_number")
    }
)
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ===================== IDENTITY ===================== */

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "middle_name", length = 50)
    private String middleName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "id_number", nullable = false, unique = true, length = 30)
    private String idNumber;

    @Column(name = "phone_number", unique = true, length = 20)
    private String phoneNumber;

    /* ===================== PROFILE ===================== */

    @Column(name = "profile_picture")
    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, updatable = false)
    private Role role;

}
