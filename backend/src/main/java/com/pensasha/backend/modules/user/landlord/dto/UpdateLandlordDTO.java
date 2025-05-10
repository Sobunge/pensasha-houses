package com.pensasha.backend.modules.user.landlord.dto;

import java.util.Set;

import org.springframework.validation.annotation.Validated;

import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * DTO class for updating landlord details, extending UpdateUserDTO.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Validated
@EqualsAndHashCode(callSuper = true)
public class UpdateLandlordDTO extends UpdateUserDTO {

    /**
     * Set of property IDs owned by this landlord.
     */
    private Set<Long> propertyIds;

    /**
     * Bank details associated with this landlord.
     */
    private BankDetailsDTO bankDetails;
}