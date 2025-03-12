package com.pensasha.backend.houses;

import java.util.Set;

import com.pensasha.backend.user.models.LandLord;
import com.pensasha.backend.user.models.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private LandLord landLord;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Unit> units;

    @ManyToOne
    @JoinColumn(name = "LandLord_Id")
    private User user;

}
