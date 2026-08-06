package com.pensasha.backend.modules.document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID> {

    List<Document> findAllByUser_Id(Long userId);

    long countByUser_Id(Long userId);

    Optional<Document> findByUser_IdAndDocumentType(Long userId, DocumentType documentType);

    boolean existsByUser_IdAndDocumentType(Long userId, DocumentType documentType);

    /* Role-Filtered Workspace Inquiries */
    List<Document> findByUser_IdAndDocumentTypeInOrderByUploadedAtDesc(Long userId, Collection<DocumentType> documentTypes);

    long countByUser_IdAndDocumentTypeIn(Long userId, Collection<DocumentType> documentTypes);
}