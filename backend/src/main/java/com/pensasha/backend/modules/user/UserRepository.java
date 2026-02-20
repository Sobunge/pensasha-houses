package com.pensasha.backend.modules.user;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the User entity.
 * Provides CRUD operations and custom queries for User entities.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Retrieves all users with a specific role, with pagination support.
     * 
     * @param role     The role of the users to filter by (e.g., ADMIN, LANDLORD).
     * @param pageable Pagination information (e.g., page number, page size).
     * @return A Page of users with the specified role.
     */
    Page<User> findAllByRole(Role role, Pageable pageable);

    /**
     * Finds a user by their unique ID number (optional, collected later).
     * 
     * @param idNumber The ID number of the user.
     * @return An Optional containing the User if found.
     */
    Optional<User> findByIdNumber(String idNumber);

    /**
     * Checks whether a user with the given ID number exists in the database.
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
     * @return Optional containing the User if found.
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