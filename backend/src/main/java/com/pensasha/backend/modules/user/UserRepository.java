package com.pensasha.backend.modules.user;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the User entity.
 * Provides methods to perform CRUD operations and custom queries for User
 * entities in the database.
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
     * Finds a user by their unique ID number.
     * 
     * @param idNumber The ID number of the user (e.g., ID, passport).
     * @return An Optional containing the User if found, otherwise empty.
     */
    Optional<User> findByIdNumber(String idNumber);

    /**
     * Checks whether a user with the given ID number exists in the database.
     * 
     * @param idNumber The ID number to check for existence.
     * @return true if a user with the given ID number exists, false otherwise.
     */
    Boolean existsByIdNumber(String idNumber);

    Optional<User> findByRole(Role role, Pageable pageable);
}
