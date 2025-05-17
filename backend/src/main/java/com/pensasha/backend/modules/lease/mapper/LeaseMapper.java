package com.pensasha.backend.modules.lease.mapper;

import org.mapstruct.Mapper;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.lease.dto.LeaseDTO;

@Mapper(componentModel = "spring")
public interface LeaseMapper {

    Lease toEntity(LeaseDTO leaseDTO);
}
