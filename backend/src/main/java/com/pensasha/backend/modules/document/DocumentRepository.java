package com.pensasha.backend.modules.document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID> {

    /* ===================== BASIC QUERIES ===================== */

    List<Document> findAllByUser_Id(Long userId);

    long countByUser_Id(Long userId);

    /* ===================== BUSINESS QUERIES ===================== */

    Optional<Document> findByUser_IdAndDocumentType(Long userId, String documentType);

    boolean existsByUser_IdAndDocumentType(Long userId, String documentType);
}
