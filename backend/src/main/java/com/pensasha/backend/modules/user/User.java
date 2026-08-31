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
     * Public identifier safe to expose externally.
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

    @Column(unique = true, length = 30)
    private String idNumber;

    @Column(nullable = false, unique = true, length = 15)
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
    private ProfileCompletionStatus profileCompletionStatus = ProfileCompletionStatus.BASIC;

    /* ===================== ROLES ===================== */

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    /* ===================== PERMISSION OVERRIDES ===================== */

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private Set<UserPermissionOverride> permissionOverrides = new HashSet<>();

    /* ===================== ROLE PROFILES ===================== */

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private TenantProfile tenantProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private LandlordProfile landlordProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private CaretakerProfile caretakerProfile;

    /* ===================== SECURITY ===================== */

    @Column(nullable = false)
    private int tokenVersion = 0;

    /* ===================== AUDIT ===================== */

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    /* ===================== ROLE HELPERS ===================== */

    public void addRole(Role role) {
        roles.add(role);
    }

    public void removeRole(Role role) {
        roles.remove(role);
    }

    public boolean hasRole(String roleName) {
        return roles.stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase(roleName));
    }

    /* ===================== PERMISSION HELPERS ===================== */

    /**
     * Returns the user's effective permissions.
     * Effective permissions consist of:
     * - Permissions inherited from assigned roles.
     * - User-specific permission overrides.
     */
    public Set<String> getPermissions() {

        Set<String> permissions = new HashSet<>();

        // Permissions inherited from roles
        roles.forEach(role ->
                role.getPermissions().forEach(permission ->
                        permissions.add(permission.getName())
                )
        );

        // Apply user-specific overrides
        permissionOverrides.forEach(override -> {

            String permission = override.getPermission().getName();

            if (override.getEffect() == PermissionEffect.GRANT) {
                permissions.add(permission);
            } else {
                permissions.remove(permission);
            }
        });

        return Set.copyOf(permissions);
    }

    public boolean hasPermission(String permissionName) {
        return getPermissions().contains(permissionName);
    }

    /* ===================== PROFILE HELPERS ===================== */

    public void setTenantProfile(TenantProfile profile) {
        tenantProfile = profile;
        if (profile != null) {
            profile.setUser(this);
        }
    }

    public void setLandlordProfile(LandlordProfile profile) {
        landlordProfile = profile;
        if (profile != null) {
            profile.setUser(this);
        }
    }

    public void setCaretakerProfile(CaretakerProfile profile) {
        caretakerProfile = profile;
        if (profile != null) {
            profile.setUser(this);
        }
    }

    /* ===================== FACTORY ===================== */

    public static User minimal(String phoneNumber, Role role) {

        User user = new User();

        user.setPhoneNumber(phoneNumber);
        user.addRole(role);

        return user;
    }
}