package com.pensasha.backend.modules.user;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Base entity representing a User.
 * Subclasses include Tenant, LandLord, and Caretaker.
 * Inheritance strategy is JOINED: each subclass has its own table.
 */
@Entity
@Table(name = "users",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "idNumber"),
           @UniqueConstraint(columnNames = "phoneNumber") // optional, can allow null
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Required for registration
    @Column(nullable = false)
    private String firstName = "";

    private String secondName = "";

    @Column(nullable = false)
    private String thirdName = "";

    @Column(unique = true, nullable = false)
    private String idNumber = "";

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = true)
    private String phoneNumber;

    private String profilePicture = "";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.TENANT;

    @Column(nullable = false)
    private boolean enabled = true;

    private boolean locked = false;

    private LocalDateTime accountExpirationDate;

    private LocalDateTime passwordExpirationDate;
}
