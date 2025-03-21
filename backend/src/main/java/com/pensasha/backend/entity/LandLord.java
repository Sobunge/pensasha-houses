package com.pensasha.backend.entity;

import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "landlords")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LandLord extends User {

    @OneToMany(mappedBy = "landLord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Property> Properties;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bank_details_id", referencedColumnName = "id")
    private BankDetails BankDetails;

}
