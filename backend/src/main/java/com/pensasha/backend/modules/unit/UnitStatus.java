package com.pensasha.backend.modules.unit;

/**
 * Enumeration representing the various possible statuses 
 * of a rental unit within a property management system.
 */
public enum UnitStatus {
    /**
     * Indicates that the unit is currently occupied by a tenant.
     */
    OCCUPIED, 

    /**
     * Indicates that the unit is currently vacant and available for occupation.
     */
    VACANT, 

    /**
     * Indicates that the unit is reserved for a tenant but not yet occupied.
     */
    RESERVED, 

    /**
     * Indicates that the unit is temporarily unavailable due to maintenance work.
     */
    UNDER_MAINTENANCE
}
