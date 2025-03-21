package com.pensasha.backend.user.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED) // Allows subclasses to extend this entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;
    private String secondName;

    @Column(nullable = false)
    private String thirdName;

    @Column(unique = true, nullable = false)
    private String idNumber;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String phoneNumber;

    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private boolean enabled = true; // Default enabled

    private boolean locked = false; // Default not locked

    private LocalDateTime accountExpirationDate; // Optional, null means never expires

    private LocalDateTime passwordExpirationDate; // Optional, null means never expires
}

}
