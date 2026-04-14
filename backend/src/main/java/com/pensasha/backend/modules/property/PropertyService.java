package com.pensasha.backend.modules.property;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.property.dto.createPropertyDTO;
import com.pensasha.backend.modules.property.mapper.PropertyMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;

    /**
     * Creates a new property.
     * Uses fromCreateDTO to handle the specific creation fields and unit IDs.
     */
    @Transactional
    public PropertyDTO addProperty(createPropertyDTO createDTO) {
        // Prevent duplicate names
        if (propertyRepository.existsByNameIgnoreCase(createDTO.getName())) {
            throw new IllegalArgumentException("Property name '" + createDTO.getName() + "' already exists.");
        }

        Property property = propertyMapper.fromCreateDTO(createDTO);
        Property saved = propertyRepository.save(property);
        
        log.info("Property '{}' created with ID: {}", saved.getName(), saved.getId());
        return propertyMapper.toDTO(saved);
    }

    /**
     * Updates an existing property using the MapStruct update target pattern.
     * This automatically handles relationship updates and ignores nulls in the DTO.
     */
    @Transactional
    public PropertyDTO updateProperty(Long propertyId, PropertyDTO dto) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + propertyId));

        // Uniqueness check if name is being changed
        if (dto.getName() != null && !dto.getName().equalsIgnoreCase(property.getName())) {
            if (propertyRepository.existsByNameIgnoreCase(dto.getName())) {
                throw new IllegalArgumentException("Property name '" + dto.getName() + "' is already taken.");
            }
        }

        // MapStruct updates the existing entity, including Landlord and Caretaker lookups
        propertyMapper.updateEntityFromDto(dto, property);

        log.info("Property ID: {} updated successfully", propertyId);
        return propertyMapper.toDTO(property); 
    }

    @Transactional(readOnly = true)
    public PropertyDTO getProperty(Long propertyId) {
        return propertyRepository.findById(propertyId)
                .map(propertyMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + propertyId));
    }

    @Transactional(readOnly = true)
    public Page<PropertyDTO> getAllProperties(Pageable pageable) {
        return propertyRepository.findAll(pageable)
                .map(propertyMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<PropertyDTO> getPropertiesForLandlord(Long landlordId, Pageable pageable) {
        return propertyRepository.findByLandlordUserId(landlordId, pageable)
                .map(propertyMapper::toDTO);
    }

    @Transactional
    public void deleteProperty(Long propertyId) {
        if (!propertyRepository.existsById(propertyId)) {
            throw new ResourceNotFoundException("Property not found with ID: " + propertyId);
        }
        propertyRepository.deleteById(propertyId);
        log.info("Property ID: {} deleted", propertyId);
    }
}