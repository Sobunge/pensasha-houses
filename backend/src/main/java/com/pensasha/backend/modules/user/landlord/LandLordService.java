package com.pensasha.backend.modules.user.landlord;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class LandLordService {

    private final LandlordProfileRepository landlordProfileRepository;
    private final UserRepository userRepository;
    private final LandlordMapper landlordMapper;

    /* ===================== FETCH BY USER ID ===================== */
    public GetLandLordDTO getLandlordByUserId(Long userId) {
        log.info("Fetching landlord profile for userId={}", userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Landlord profile not found for userId: " + userId));

        return landlordMapper.toGetDTO(profile);
    }

    /* ===================== FETCH BY ID NUMBER ===================== */
    public GetLandLordDTO getLandlordByIdNumber(String idNumber) {
        log.info("Fetching landlord profile by user idNumber={}", idNumber);

        // Fetch the user by idNumber
        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with idNumber: " + idNumber));

        // Ensure the user has the LANDLORD role
        if (user.getRoles() == null || user.getRoles().stream()
                .noneMatch(r -> "LANDLORD".equalsIgnoreCase(r.getName()))) {
            throw new IllegalStateException("User is not a landlord");
        }

        // Fetch the landlord profile associated with the user
        LandlordProfile profile = landlordProfileRepository.findById(user.getId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Landlord profile not found for userId: " + user.getId()));

        // Map entity to DTO including roles and permissions
        return landlordMapper.toGetDTO(profile);
    }

    /* ===================== FETCH ALL LANDLORDS ===================== */
    public Page<GetLandLordDTO> getAllLandlords(Pageable pageable) {
        log.info("Fetching all landlord profiles with pagination");

        return landlordProfileRepository
                .findAll(pageable)
                .map(landlordMapper::toGetDTO);
    }

    /* ===================== DELETE LANDLORD PROFILE ===================== */
    public boolean deleteLandlordProfile(Long userId) {
        log.info("Deleting landlord profile for userId={}", userId);

        if (!landlordProfileRepository.existsById(userId)) {
            log.warn("Landlord profile not found for userId={}", userId);
            return false;
        }

        landlordProfileRepository.deleteById(userId);
        log.info("Landlord profile deleted for userId={}", userId);
        return true;
    }

    /* ===================== UPDATE PROPERTIES ===================== */
    public GetLandLordDTO updateLandlordProperties(Long userId, Set<Property> properties) {
        log.info("Updating properties for landlord userId={}", userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Landlord profile not found for userId: " + userId));

        profile.setProperties(properties);
        return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
    }

    /* ===================== UPDATE BANK DETAILS ===================== */
    public GetLandLordDTO updateLandlordBankDetails(Long userId, BankDetails bankDetails) {
        log.info("Updating bank details for landlord userId={}", userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Landlord profile not found for userId: " + userId));

        profile.setBankDetails(bankDetails);
        return landlordMapper.toGetDTO(landlordProfileRepository.save(profile));
    }
}