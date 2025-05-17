package com.pensasha.backend.modules.payment.dto;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {

    private Long id;

    private Double amount;

    private LocalDate paymentDate;

    private String method; // Could be enum name or string representation

    private Long tenantId;

    private Long invoiceId; // nullable, since invoice is optional
}