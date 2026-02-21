package com.pensasha.backend.modules.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for the User entity.
 * Provides CRUD operations and custom queries for User entities.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Retrieves all users having a specific role, with pagination support.
     * Supports multi-role users (users may have multiple roles).
     *
     * @param role     The role to filter by (e.g., TENANT, LANDLORD).
     * @param pageable Pagination information (page number, size, sort).
     * @return A Page of users that have the specified role.
     */
    Page<User> findAllByRolesContaining(Role role, Pageable pageable);

    /**
     * Finds a user by their unique ID number (optional, collected later).
     *
     * @param idNumber The ID number of the user.
     * @return Optional containing the user if found.
     */
    Optional<User> findByIdNumber(String idNumber);

    /**
     * Checks whether a user with the given ID number exists.
     *
     * @param idNumber The ID number to check.
     * @return true if a user with the ID exists, false otherwise.
     */
    Boolean existsByIdNumber(String idNumber);

    /**
     * Checks whether a user with the given phone number exists.
     *
     * @param phoneNumber The phone number to check.
     * @return true if a user with the phone exists, false otherwise.
     */
    Boolean existsByPhoneNumber(String phoneNumber);

    /**
     * Finds a user by their public ID (used in JWTs and safe external references).
     *
     * @param publicId The publicId of the user.
     * @return Optional containing the user if found.
     */
    Optional<User> findByPublicId(String publicId);

    /**
     * Checks whether a user with the given publicId exists.
     *
     * @param publicId The publicId to check.
     * @return true if a user with the publicId exists, false otherwise.
     */
    Boolean existsByPublicId(String publicId);
}