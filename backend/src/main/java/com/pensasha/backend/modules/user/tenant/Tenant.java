package com.pensasha.backend.modules.user.tenant;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.User;

@Entity
@Table(name = "tenants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tenant extends User {

    @OneToMany(
        mappedBy = "tenant",
        cascade = CascadeType.ALL,
        fetch = FetchType.LAZY
    )
    private List<Lease> leases;

    @Column(length = 15)
    private String emergencyContact;
}
