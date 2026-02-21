package com.pensasha.backend.modules.user;

import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    /* ===================== INTERNAL ID ===================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Public safe identifier exposed to frontend and JWT.
     * Prevents ID enumeration attacks.
     */
    @Column(nullable = false, unique = true, updatable = false, length = 50)
    private String publicId;

    @PrePersist
    public void generatePublicId() {
        if (publicId == null) {
            this.publicId = "usr_" + UUID.randomUUID();
        }
    }

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

    /**
     * REQUIRED — primary login identity (E.164 format)
     */
    @Column(unique = true, nullable = false, length = 15)
    private String phoneNumber;

    @Column(unique = true, length = 100)
    private String email;

    /* ===================== PROFILE ===================== */

    @Column(name = "profile_picture_url", length = 255)
    private String profilePictureUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProfileCompletionStatus profileCompletionStatus =
            ProfileCompletionStatus.BASIC;

    /* ===================== ROLES ===================== */

    /**
     * A user can have multiple roles (TENANT, LANDLORD, CARETAKER, etc.)
     */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Set<Role> roles = new HashSet<>();

    /* ===================== ROLE PROFILES ===================== */

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private TenantProfile tenantProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private LandlordProfile landlordProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private CaretakerProfile caretakerProfile;

    /* ===================== AUDIT ===================== */

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    /* ===================== ROLE HELPERS ===================== */

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public void removeRole(Role role) {
        this.roles.remove(role);
    }

    public boolean hasRole(Role role) {
        return this.roles.contains(role);
    }

    /* ===================== PROFILE HELPERS ===================== */

    public void setTenantProfile(TenantProfile profile) {
        this.tenantProfile = profile;
        if (profile != null) {
            profile.setUser(this);
        }
    }

    public void setLandlordProfile(LandlordProfile profile) {
        this.landlordProfile = profile;
        if (profile != null) {
            profile.setUser(this);
        }
    }

    public void setCaretakerProfile(CaretakerProfile profile) {
        this.caretakerProfile = profile;
        if (profile != null) {
            profile.setUser(this);
        }
    }

    /* ===================== FACTORY ===================== */

    /**
     * Minimal registration entry.
     * Used at first signup (phone + initial role only).
     */
    public static User minimal(String phoneNumber, Role role) {
        User user = new User();
        user.setPhoneNumber(phoneNumber);
        user.addRole(role);
        return user;
    }
}