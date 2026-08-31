package com.pensasha.backend.modules.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

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
@AllArgsConstructor
public class UserPermissionOverride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User receiving the override.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Permission being overridden.
     */
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "permission_id", nullable = false)
    private Permission permission;

    /**
     * Whether this permission is granted or denied.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "effect", nullable = false, length = 10)
    private PermissionEffect effect;

    public UserPermissionOverride(User user, Permission permission, PermissionEffect effect) {
        this.user = user;
        this.permission = permission;
        this.effect = effect;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPermissionOverride that = (UserPermissionOverride) o;
        return Objects.equals(user != null ? user.getId() : null, that.user != null ? that.user.getId() : null) &&
               Objects.equals(permission != null ? permission.getName() : null, that.permission != null ? that.permission.getName() : null);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            user != null ? user.getId() : null,
            permission != null ? permission.getName() : null
        );
    }
}