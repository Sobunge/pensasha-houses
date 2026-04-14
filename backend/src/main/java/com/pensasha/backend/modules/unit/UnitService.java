package com.pensasha.backend.modules.unit;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.unit.dto.UnitDTO;
import com.pensasha.backend.modules.unit.mapper.UnitMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class UnitService {

    private final UnitRepository unitRepository;
    private final UnitMapper unitMapper;

    public UnitDTO addUnit(UnitDTO unitDto) {
        log.info("Creating unit: {} for property: {}", unitDto.getUnitNumber(), unitDto.getPropertyId());
        Unit unit = unitMapper.toEntity(unitDto);
        return unitMapper.toDTO(unitRepository.save(unit));
    }

    public UnitDTO getUnitById(Long id) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + id));
        return unitMapper.toDTO(unit);
    }

    public Page<UnitDTO> getAllUnits(Pageable pageable) {
        return unitRepository.findAll(pageable).map(unitMapper::toDTO);
    }

    @Transactional
    public UnitDTO updateUnit(Long id, UnitDTO unitDto) {
        Unit existingUnit = unitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        
        unitMapper.updateEntityFromDto(unitDto, existingUnit);
        return unitMapper.toDTO(unitRepository.save(existingUnit));
    }

    @Transactional
    public void deleteUnit(Long id) {
        if (!unitRepository.existsById(id)) throw new ResourceNotFoundException("Unit not found");
        unitRepository.deleteById(id);
    }

    public List<UnitDTO> getUnitsByProperty(Long propertyId) {
        return unitRepository.findByPropertyId(propertyId).stream()
                .map(unitMapper::toDTO)
                .collect(Collectors.toList());
    }

    public BigDecimal calculateRentDue(Long id) {
        return getUnitById(id).getRentAmount();
    }
}