package com.pensasha.backend.modules.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "user_permission_overrides",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "permission_id"})
    }
)
@Getter
@Setter
@NoArgsConstructor
public class UserPermissionOverride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User receiving the override.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Permission being overridden.
     */
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "permission_id")
    private Permission permission;

    /**
     * Whether this permission is granted or denied.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PermissionEffect effect;
}