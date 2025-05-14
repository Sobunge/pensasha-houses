package com.pensasha.backend.modules.user.landlord;

import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.landlord.dto.LandLordDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service class for handling business logic related to LandLord entities.
 */
@Service
@AllArgsConstructor
@Slf4j
public class LandLordService {

    private final LandLordRepository landLordRepository;
    private final LandlordMapper landLordMapper;

    /**
     * Retrieves a specific landlord using their national ID number.
     *
     * @param idNumber the landlord's national ID number
     * @return the LandLord entity if found
     * @throws ResourceNotFoundException if the landlord doesn't exist
     */
    public LandLordDTO getLandlordById(String idNumber) {
        log.info("Fetching landlord with National ID: {}", idNumber);
        LandLord createdLandLord = landLordRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> {
                    log.error("LandLord with National ID: {} not found.", idNumber);
                    return new ResourceNotFoundException("LandLord with National ID: " + idNumber + " not found.");
                });

        return landLordMapper.toDTO(createdLandLord);
    }

    /**
     * Retrieves a list of all landlords in the system.
     *
     * @return List of LandLord entities
     */
    public List<LandLordDTO> getAllLandlords() {
        log.info("Fetching all landlords.");
        List<LandLord> landLords = landLordRepository.findAll();
        log.info("Found {} landlords.", landLords.size());

        return landLords.stream()
                .map(landLordMapper::toDTO)
                .collect(Collectors.toList());

    }

    /**
     * Deletes a landlord by their system-generated ID.
     *
     * @param id the landlord's database ID
     * @return true if successfully deleted, false otherwise
     */
    public boolean deleteLandlord(Long id) {
        log.info("Attempting to delete landlord with ID: {}", id);
        if (landLordRepository.existsById(id)) {
            landLordRepository.deleteById(id);
            log.info("Successfully deleted landlord with ID: {}", id);
            return true;
        }
        log.warn("Landlord with ID: {} not found for deletion.", id);
        return false;
    }

    /**
     * Updates the list of properties associated with a specific landlord.
     *
     * @param idNumber   the landlord's national ID number
     * @param properties the new set of properties to assign
     * @return the updated LandLord entity
     * @throws ResourceNotFoundException if the landlord doesn't exist
     */
    public LandLordDTO updateLandlordProperties(String idNumber, Set<Property> properties) {
        log.info("Updating properties for landlord with National ID: {}", idNumber);
        LandLord landLord = landLordRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> {
                    log.error("LandLord with National ID: {} not found for property update.", idNumber);
                    return new ResourceNotFoundException("LandLord with National ID: " + idNumber + " not found.");
                });

        landLord.setProperties(properties);
        LandLord updatedLandLord = landLordRepository.save(landLord);
        log.info("Successfully updated properties for landlord with National ID: {}", idNumber);


        return landLordMapper.toDTO(updatedLandLord);
    }

    /**
     * Updates the bank details associated with a specific landlord.
     *
     * @param idNumber    the landlord's national ID number
     * @param bankDetails the new bank details to assign
     * @return the updated LandLord entity
     * @throws ResourceNotFoundException if the landlord doesn't exist
     */
    public LandLord updateLandlordBankDetails(String idNumber, BankDetails bankDetails) {
        log.info("Updating bank details for landlord with National ID: {}", idNumber);
        LandLord landLord = landLordRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> {
                    log.error("LandLord with National ID: {} not found for bank details update.", idNumber);
                    return new ResourceNotFoundException("LandLord with National ID: " + idNumber + " not found.");
                });

        landLord.setBankDetails(bankDetails);
        LandLord updatedLandLord = landLordRepository.save(landLord);
        log.info("Successfully updated bank details for landlord with National ID: {}", idNumber);
        return updatedLandLord;
    }
}
