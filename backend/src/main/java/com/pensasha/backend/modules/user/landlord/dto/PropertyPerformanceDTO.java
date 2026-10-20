package com.pensasha.backend.modules.user.landlord.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyPerformanceDTO {
    private Long id;
    private String name;
    private int units;
    private long occupied;
    private BigDecimal revenue;
}