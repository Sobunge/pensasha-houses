package com.pensasha.backend.user.models;

import com.pensasha.backend.role.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.validation.annotation.Validated;

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

}
