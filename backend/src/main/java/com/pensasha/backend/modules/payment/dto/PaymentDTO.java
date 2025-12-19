package com.pensasha.backend.modules.payment.dto;

import java.time.LocalDate;
import java.util.UUID;

import lombok.*;

/**
 * Data Transfer Object for Payment.
 * Represents the minimal information required to create or view a Payment.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {

    private Long id;

    private Double amount;

    private LocalDate paymentDate;

    private String method; // Could be enum name or string

    private Long tenantId;

    private UUID invoiceNumber; // Match Invoice entity type
}
