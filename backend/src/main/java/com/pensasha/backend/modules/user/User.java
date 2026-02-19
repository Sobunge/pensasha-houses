package com.pensasha.backend.modules.user;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ===================== IDENTITY ===================== */

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String middleName;

    @Column(length = 50)
    private String lastName;

    // Optional — collected later during verification
    @Column(unique = true, length = 30)
    private String idNumber;

    // REQUIRED — primary login identity (E.164 format)
    @Column(unique = true, nullable = false, length = 15)
    private String phoneNumber;

    // Optional email
    @Column(unique = true, length = 100)
    private String email;

    /* ===================== PROFILE ===================== */

    @Column(name = "profile_picture_url", length = 255)
    private String profilePictureUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProfileCompletionStatus profileCompletionStatus =
            ProfileCompletionStatus.BASIC;

    /* ===================== AUDIT ===================== */

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    /* ===================== FACTORY ===================== */

    /**
     * Minimal registration entry.
     * Used at first signup (phone + role only).
     */
    public static User minimal(
            String phoneNumber,
            Role role
    ) {
        User user = new User();
        user.setPhoneNumber(phoneNumber);
        user.setRole(role);
        return user;
    }
}
