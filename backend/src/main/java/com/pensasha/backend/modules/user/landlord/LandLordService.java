package com.pensasha.backend.modules.user.landlord;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

/**
 * Service class for handling business logic related to LandLord entities.
 */
@Service
@AllArgsConstructor
@Slf4j
public class LandLordService {

    private final LandLordRepository landLordRepository;
    private final LandlordMapper landLordMapper;

    // ---------------------- Fetch by ID Number ----------------------
    public GetLandLordDTO getLandlordByIdNumber(String idNumber) {
        log.info("Fetching landlord with National ID: {}", idNumber);
        LandLord landLord = landLordRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> {
                    log.error("LandLord with National ID: {} not found.", idNumber);
                    return new ResourceNotFoundException("LandLord with National ID: " + idNumber + " not found.");
                });

        return landLordMapper.toGetDTO(landLord); // use GetLandLordDTO
    }

    // --------------------- Fetch by ID ----------------------
    public GetLandLordDTO getLandLordById(Long id) {
        log.info("Fetching landlord with ID: {}", id);
        LandLord landLord = landLordRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("LandLord with ID: {} not found.", id);
                    return new ResourceNotFoundException("LandLord with ID: " + id + " not found.");
                });

        return landLordMapper.toGetDTO(landLord); // use GetLandLordDTO
    }   

    // ---------------------- Fetch all with pagination ----------------------
    public Page<GetLandLordDTO> getAllLandlords(Pageable pageable) {
        log.info("Fetching landlords with pagination - page: {}, size: {}", pageable.getPageNumber(),
                pageable.getPageSize());

        Page<LandLord> landLords = landLordRepository.findAll(pageable);
        log.info("Found {} landlords on this page.", landLords.getNumberOfElements());

        return landLords.map(landLordMapper::toGetDTO); // use GetLandLordDTO
    }

    // ---------------------- Delete ----------------------
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

    // ---------------------- Update Properties ----------------------
    public GetLandLordDTO updateLandlordProperties(String idNumber, Set<Property> properties) {
        log.info("Updating {} properties for landlord with National ID: {}", properties.size(), idNumber);

        LandLord landLord = landLordRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> {
                    log.error("LandLord with National ID: {} not found for property update.", idNumber);
                    return new ResourceNotFoundException("LandLord with National ID: " + idNumber + " not found.");
                });

        landLord.setProperties(properties);
        LandLord updatedLandLord = landLordRepository.save(landLord);

        log.info("Successfully updated {} properties for landlord with National ID: {}",
                properties.size(), idNumber);

        return landLordMapper.toGetDTO(updatedLandLord); // return GetLandLordDTO
    }

    // ---------------------- Update Bank Details ----------------------
    public GetLandLordDTO updateLandlordBankDetails(String idNumber, BankDetails bankDetails) {
        log.info("Updating bank details for landlord with National ID: {}", idNumber);

        LandLord landLord = landLordRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> {
                    log.error("LandLord with National ID: {} not found for bank details update.", idNumber);
                    return new ResourceNotFoundException("LandLord with National ID: " + idNumber + " not found.");
                });

        landLord.setBankDetails(bankDetails);
        LandLord updatedLandLord = landLordRepository.save(landLord);

        log.info("Successfully updated bank details for landlord with National ID: {}", idNumber);

        return landLordMapper.toGetDTO(updatedLandLord); // return GetLandLordDTO
    }
}
