package com.pensasha.backend.modules.user.landlord.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRequestDTO {
    private Long id;
    private String status;   // e.g., "New", "In Progress", "Resolved"
    private String unitName; // e.g., "Unit B2"
    private String issue;    // e.g., "Plumbing Leak"
    private String urgency;  // e.g., "Urgent", "Medium", "Low"
}