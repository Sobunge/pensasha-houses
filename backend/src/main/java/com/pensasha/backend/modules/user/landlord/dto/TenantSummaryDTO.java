package com.pensasha.backend.modules.user.landlord.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TenantSummaryDTO {
    private long activeTenants;
    private long expiringLeases;
    private long pendingNotices;
}