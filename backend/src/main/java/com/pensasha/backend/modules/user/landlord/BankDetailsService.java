package com.pensasha.backend.modules.user.landlord;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@AllArgsConstructor
public class BankDetailsService {

    private final BankDetailsRepository bankDetailsRepository;
    private final LandlordProfileRepository landlordProfileRepository;
    private final LandlordMapper landlordMapper;

    /**
     * Create or update a bank details record directly.
     *
     * @param bankDetails The bank details to save.
     * @return The saved BankDetails entity.
     */
    @Transactional
    public BankDetails saveBankDetails(BankDetails bankDetails) {
        return bankDetailsRepository.save(bankDetails);
    }

    /**
     * Retrieve all bank details records.
     *
     * @return List of all BankDetails entities.
     */
    @Transactional(readOnly = true)
    public List<BankDetails> getAllBankDetails() {
        return bankDetailsRepository.findAll();
    }

    /**
     * Retrieve a bank details record by its ID.
     *
     * @param id The ID of the bank details record.
     * @return Optional containing the found BankDetails or empty if not found.
     */
    @Transactional(readOnly = true)
    public Optional<BankDetails> getBankDetailsById(Long id) {
        return bankDetailsRepository.findById(id);
    }

    /**
     * Delete a bank details record by its ID.
     *
     * @param id The ID of the bank details record to delete.
     */
    @Transactional
    public void deleteBankDetails(Long id) {
        bankDetailsRepository.deleteById(id);
    }

    /* ===================== LANDLORD-SPECIFIC BANK MANAGEMENT ===================== */

    /**
     * Retrieve all bank accounts associated with a specific landlord.
     *
     * @param userId The ID of the landlord user.
     * @return Set of BankDetails entities for the landlord.
     */
    @Transactional(readOnly = true)
    public Set<BankDetails> getLandlordBankDetails(Long userId) {
        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Landlord profile not found for userId: " + userId));

        return profile.getBankDetails();
    }

    /**
     * Add a new bank account to a landlord's profile.
     *
     * @param userId         The landlord's user ID.
     * @param newBankDetails The new bank account to attach.
     * @return Updated GetLandLordDTO.
     */
    @Transactional
    public GetLandLordDTO addBankDetailsToLandlord(Long userId, BankDetails newBankDetails) {
        log.info("Adding new bank account for landlord userId={}", userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Landlord profile not found for userId: " + userId));

        profile.addBankDetails(newBankDetails);

        return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
    }

    /**
     * Update an existing bank account belonging to a landlord.
     *
     * @param userId         The landlord's user ID.
     * @param bankDetailsId  The ID of the specific bank account record to update.
     * @param updatedDetails Updated field values.
     * @return Updated GetLandLordDTO.
     */
    @Transactional
    public GetLandLordDTO updateBankDetails(Long userId, Long bankDetailsId, BankDetails updatedDetails) {
        log.info("Updating bankDetailsId={} for landlord userId={}", bankDetailsId, userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Landlord profile not found for userId: " + userId));

        BankDetails existing = profile.getBankDetails().stream()
                .filter(b -> b.getId().equals(bankDetailsId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bank details record with ID " + bankDetailsId + " not found for landlord userId: " + userId));

        existing.setBankName(updatedDetails.getBankName());
        existing.setAccountName(updatedDetails.getAccountName());
        existing.setAccountNumber(updatedDetails.getAccountNumber());
        existing.setBranchName(updatedDetails.getBranchName());

        return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
    }

    /**
     * Remove a bank account from a landlord's profile.
     *
     * @param userId        The landlord's user ID.
     * @param bankDetailsId The ID of the bank details record to remove.
     * @return Updated GetLandLordDTO.
     */
    @Transactional
    public GetLandLordDTO removeBankDetailsFromLandlord(Long userId, Long bankDetailsId) {
        log.info("Removing bankDetailsId={} for landlord userId={}", bankDetailsId, userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Landlord profile not found for userId: " + userId));

        BankDetails existing = profile.getBankDetails().stream()
                .filter(b -> b.getId().equals(bankDetailsId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bank details record with ID " + bankDetailsId + " not found for landlord userId: " + userId));

        profile.removeBankDetails(existing);

        return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
    }
}