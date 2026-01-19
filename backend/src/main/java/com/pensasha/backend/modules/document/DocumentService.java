package com.pensasha.backend.modules.document;

import com.pensasha.backend.config.FileStorageProperties;
import com.pensasha.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private static final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("pdf", "jpg", "jpeg", "png");
    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
            "application/pdf",
            "image/jpeg",
            "image/png"
    );

    private final DocumentRepository documentRepository;
    private final FileStorageProperties fileStorageProperties;

    private Path storageRoot;

    @PostConstruct
    void init() {
        this.storageRoot = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath()
                .normalize();

        try {
            Files.createDirectories(storageRoot);
        } catch (IOException e) {
            throw new IllegalStateException("Could not initialize storage directory", e);
        }
    }

    /* ===================== UPLOAD ===================== */
    public Document uploadDocument(MultipartFile file, String documentType, User user) throws IOException {

        validateUploadRequest(file, documentType, user);

        String extension = extractAndValidateExtension(file);
        validateMimeType(file);

        String safeDocType = sanitize(documentType);
        String storageKey = safeDocType + "_" + UUID.randomUUID() + "." + extension;

        Path userDir = storageRoot.resolve(user.getId().toString());
        Files.createDirectories(userDir);

        Path targetPath = userDir.resolve(storageKey).normalize();

        if (!targetPath.startsWith(userDir)) {
            throw new SecurityException("Invalid file path");
        }

        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        Document document = new Document(
                documentType,
                storageKey,
                file.getContentType(),
                file.getSize(),
                storageKey,
                user
        );

        return documentRepository.save(document);
    }

    /* ===================== READ ===================== */
    public List<Document> getDocumentsForUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        return documentRepository.findAllByUser_Id(userId);
    }

    /* ===================== GET SINGLE ===================== */
    public Document getDocument(UUID documentId, User user) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new IllegalArgumentException("Document not found"));

        if (!document.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Access denied");
        }

        return document;
    }

    /* ===================== PATH RESOLUTION ===================== */
    public Path getDocumentPath(Document document) {
        Path path = storageRoot
                .resolve(document.getUser().getId().toString())
                .resolve(document.getStorageKey())
                .normalize();

        if (!path.startsWith(storageRoot)) {
            throw new SecurityException("Invalid path resolution");
        }

        return path;
    }

    /* ===================== DELETE ===================== */
    public void deleteDocument(UUID documentId, User user) {
        Document document = getDocument(documentId, user);
        Path path = getDocumentPath(document);

        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.error("Failed to delete file for document {}", documentId, e);
        }

        documentRepository.delete(document);
    }

    /* ===================== COUNT ===================== */
    public long countDocumentsForUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        return documentRepository.countByUser_Id(userId);
    }

    /* ===================== HELPERS ===================== */

    private void validateUploadRequest(MultipartFile file, String documentType, User user) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }
        if (documentType == null || documentType.isBlank()) {
            throw new IllegalArgumentException("Document type is required");
        }
        if (user == null) {
            throw new IllegalArgumentException("User is required");
        }
    }

    private String extractAndValidateExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        if (name == null || !name.contains(".")) {
            throw new IllegalArgumentException("File has no extension");
        }

        String ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(ext)) {
            throw new IllegalArgumentException("File type not allowed");
        }

        return ext;
    }

    private void validateMimeType(MultipartFile file) {
        if (!ALLOWED_MIME_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Invalid MIME type");
        }
    }

    private String sanitize(String input) {
        return input
                .toLowerCase()
                .replaceAll("[^a-z0-9_-]", "_");
    }
}
