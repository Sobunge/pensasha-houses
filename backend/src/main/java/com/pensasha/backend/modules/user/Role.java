package com.pensasha.backend.modules.user;

/**
 * Enumeration representing the different user roles within the system.
 * Used to assign and control access levels for various types of users.
 */
public enum Role {

    /** System administrator with full access rights */
    ADMIN,

    /** Landlord who owns properties and manages their details */
    LANDLORD,

    /** Caretaker responsible for managing a specific property on behalf of the landlord */
    CARETAKER,

    /** Tenant who rents a unit within a property */
    TENANT;
}
