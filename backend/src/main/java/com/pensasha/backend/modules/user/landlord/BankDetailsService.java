package com.pensasha.backend.modules.user.landlord;

import org.springframework.stereotype.Service;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class BankDetailsService {

    private final BankDetailsRepository bankDetailsRepository;
    private final LandlordProfileRepository landlordProfileRepository;
    private final LandlordMapper landlordMapper;

    /**
     * Create or update a bank details record.
     *
     * @param bankDetails The bank details to save.
     * @return The saved BankDetails entity.
     */
    public BankDetails saveBankDetails(BankDetails bankDetails) {
        return bankDetailsRepository.save(bankDetails);
    }

    /**
     * Retrieve all bank details records.
     *
     * @return List of all BankDetails entities.
     */
    public List<BankDetails> getAllBankDetails() {
        return bankDetailsRepository.findAll();
    }

    /**
     * Retrieve a bank details record by its ID.
     *
     * @param id The ID of the bank details record.
     * @return Optional containing the found BankDetails or empty if not found.
     */
    public Optional<BankDetails> getBankDetailsById(Long id) {
        return bankDetailsRepository.findById(id);
    }

    /**
     * Delete a bank details record by its ID.
     *
     * @param id The ID of the bank details record to delete.
     */
    public void deleteBankDetails(Long id) {
        bankDetailsRepository.deleteById(id);
    }

    /* ===================== UPDATE BANK DETAILS ===================== */
    public GetLandLordDTO updateLandlordBankDetails(Long userId, BankDetails newBankDetails) {
        log.info("Updating bank details for landlord userId={}", userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Landlord profile not found for userId: " + userId));

        if (profile.getBankDetails() != null) {
            // Update fields on the existing managed entity to preserve relationship integrity
            BankDetails existing = profile.getBankDetails();
            existing.setBankName(newBankDetails.getBankName());
            existing.setAccountName(newBankDetails.getAccountName());
            existing.setAccountNumber(newBankDetails.getAccountNumber());
            existing.setBranchName(newBankDetails.getBranchName());
        } else {
            profile.setBankDetails(newBankDetails);
        }

        return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
    }
}
