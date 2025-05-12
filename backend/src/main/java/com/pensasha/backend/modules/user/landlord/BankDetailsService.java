package com.pensasha.backend.modules.user.landlord;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BankDetailsService {

    private final BankDetailsRepository bankDetailsRepository;

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
}
