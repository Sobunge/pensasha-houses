package com.pensasha.backend.modules.document;

import com.pensasha.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "documents")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = "user")
public class Document {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private UUID id;

    /* ===================== BUSINESS ===================== */
    @Column(name = "document_type", nullable = false)
    private String documentType;

    /* ===================== FILE METADATA ===================== */
    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(name = "file_size", nullable = false)
    private long fileSize;

    /* ===================== STORAGE ===================== */
    @Column(name = "storage_key", nullable = false, unique = true)
    private String storageKey;

    /* ===================== AUDIT ===================== */
    @Column(name = "uploaded_at", nullable = false, updatable = false)
    private LocalDateTime uploadedAt;

    /* ===================== RELATIONSHIP ===================== */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    /* ===================== CONSTRUCTOR ===================== */
    public Document(
            String documentType,
            String fileName,
            String contentType,
            long fileSize,
            String storageKey,
            User user) {

        if (documentType == null || fileName == null || contentType == null || storageKey == null || user == null) {
            throw new IllegalArgumentException("Document fields must not be null");
        }

        this.documentType = documentType;
        this.fileName = fileName;
        this.contentType = contentType;
        this.fileSize = fileSize;
        this.storageKey = storageKey;
        this.user = user;
        this.uploadedAt = LocalDateTime.now();
    }
}
