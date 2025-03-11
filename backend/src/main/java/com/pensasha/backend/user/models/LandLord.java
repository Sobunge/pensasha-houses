package com.pensasha.backend.user.models;

import java.util.Set;

import com.pensasha.backend.bankDetails.BankDetails;
import com.pensasha.backend.houses.Property;

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
public class LandLord extends User{
    
    @OneToMany(mappedBy = "User", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Property> Properties;

    private BankDetails BankDetails;
}
