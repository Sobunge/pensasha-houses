package com.pensasha.backend.modules.user.landlord.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecentPaymentDTO {
    private Long id;
    private LocalDate paymentDate;
    private String tenantName;
    private String unitName;
    private BigDecimal amount;
    private String method;
}