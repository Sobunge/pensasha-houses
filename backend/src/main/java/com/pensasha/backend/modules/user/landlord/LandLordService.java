package com.pensasha.backend.modules.user.landlord;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;
import com.pensasha.backend.modules.user.landlord.dto.GetLandLordDTO;
import com.pensasha.backend.modules.user.landlord.mapper.LandlordMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class LandlordService {

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

        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with idNumber: " + idNumber));

        if (user.getRole() != Role.LANDLORD) {
            throw new IllegalStateException("User is not a landlord");
        }

        LandlordProfile profile = landlordProfileRepository.findById(user.getId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Landlord profile not found for userId: " + user.getId()));

        return landlordMapper.toGetDTO(profile);
    }

    /* ===================== FETCH ALL LANDLORDS ===================== */

    public Page<GetLandLordDTO> getAllLandlords(Pageable pageable) {
        log.info("Fetching landlord profiles with pagination");

        return landlordProfileRepository
                .findAll(pageable)
                .map(landlordMapper::toGetDTO);
    }

    /* ===================== DELETE LANDLORD PROFILE ===================== */

    public boolean deleteLandlordProfile(Long userId) {
        log.info("Deleting landlord profile for userId={}", userId);

        if (!landlordProfileRepository.existsById(userId)) {
            log.warn("Landlord profile not found for userId={}", userId);
            return false; // not found
        }

        landlordProfileRepository.deleteById(userId);
        log.info("Landlord profile deleted for userId={}", userId);
        return true; // deleted successfully
    }

    /* ===================== UPDATE PROPERTIES ===================== */

    public GetLandLordDTO updateLandlordProperties(Long userId, Set<Property> properties) {
        log.info("Updating properties for landlord userId={}", userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Landlord profile not found for userId: " + userId));

        profile.setProperties(properties);
        return landlordMapper.toGetDTO(
                landlordProfileRepository.save(profile));
    }

    /* ===================== UPDATE BANK DETAILS ===================== */

    public GetLandLordDTO updateLandlordBankDetails(Long userId, BankDetails bankDetails) {
        log.info("Updating bank details for landlord userId={}", userId);

        LandlordProfile profile = landlordProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Landlord profile not found for userId: " + userId));

        profile.setBankDetails(bankDetails);
        return landlordMapper.toGetDTO(
                landlordProfileRepository.save(profile));
    }
}
