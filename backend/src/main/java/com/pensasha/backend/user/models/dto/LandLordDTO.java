package com.pensasha.backend.user.models.dto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandLordDTO {

    @OneToMany(mappedBy = "landLord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Property> Properties;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bank_details_id", referencedColumnName = "id")
    private BankDetails BankDetails;
}
