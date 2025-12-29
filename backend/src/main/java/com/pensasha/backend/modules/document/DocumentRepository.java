package com.pensasha.backend.modules.document;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByUserId(Long userId);
}
