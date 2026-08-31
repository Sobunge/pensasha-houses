package com.pensasha.backend.modules.document;

import com.pensasha.backend.config.FileStorageProperties;
import com.pensasha.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.*;
import java.util.Arrays;
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
    @Transactional
    public Document uploadDocument(MultipartFile file, DocumentType documentType, String activeRole, User user) throws IOException {

        validateUploadRequest(file, documentType, user);
        validateRoleAuthorization(documentType, activeRole);

        String extension = extractAndValidateExtension(file);
        validateMimeType(file);

        String safeDocType = documentType.name().toLowerCase();
        String storageKey = safeDocType + "_" + UUID.randomUUID() + "." + extension;

        Path userDir = storageRoot.resolve(user.getId().toString());
        Files.createDirectories(userDir);

        Path targetPath = userDir.resolve(storageKey).normalize();

        if (!targetPath.startsWith(userDir)) {
            throw new SecurityException("Invalid file path");
        }

        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : storageKey;

        Document document = new Document(
                documentType,
                originalFilename,
                file.getContentType(),
                file.getSize(),
                storageKey,
                user
        );

        return documentRepository.save(document);
    }

    /* ===================== READ (ALL) ===================== */
    @Transactional(readOnly = true)
    public List<Document> getDocumentsForUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        return documentRepository.findAllByUser_Id(userId);
    }

    /* ===================== READ (ROLE-AWARE) ===================== */
    @Transactional(readOnly = true)
    public List<Document> getVisibleDocumentsForActiveRole(Long userId, String activeRole) {
        List<DocumentType> visibleTypes = resolveVisibleDocumentTypes(userId, activeRole);

        if (visibleTypes.isEmpty()) {
            return List.of();
        }

        return documentRepository.findByUser_IdAndDocumentTypeInOrderByUploadedAtDesc(userId, visibleTypes);
    }

    /* ===================== GET SINGLE ===================== */
    @Transactional(readOnly = true)
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
    @Transactional
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
    @Transactional(readOnly = true)
    public long countDocumentsForUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        return documentRepository.countByUser_Id(userId);
    }

    @Transactional(readOnly = true)
    public long countVisibleDocumentsForActiveRole(Long userId, String activeRole) {
        List<DocumentType> visibleTypes = resolveVisibleDocumentTypes(userId, activeRole);

        if (visibleTypes.isEmpty()) {
            return 0L;
        }

        return documentRepository.countByUser_IdAndDocumentTypeIn(userId, visibleTypes);
    }

    /* ===================== HELPERS ===================== */

    private List<DocumentType> resolveVisibleDocumentTypes(Long userId, String activeRole) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        if (activeRole == null || activeRole.isBlank()) {
            throw new IllegalArgumentException("Active role is required");
        }

        String cleanRole = activeRole.replace("ROLE_", "").toUpperCase();

        return Arrays.stream(DocumentType.values())
                .filter(type -> type.getScope() == DocumentScope.GLOBAL ||
                        (type.getRequiredRole() != null && type.getRequiredRole().equalsIgnoreCase(cleanRole)))
                .toList();
    }

    private void validateUploadRequest(MultipartFile file, DocumentType documentType, User user) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }
        if (documentType == null) {
            throw new IllegalArgumentException("Document type is required");
        }
        if (user == null) {
            throw new IllegalArgumentException("User is required");
        }
    }

    private void validateRoleAuthorization(DocumentType documentType, String activeRole) {
        if (documentType.getScope() == DocumentScope.ROLE_SPECIFIC) {
            if (activeRole == null || !documentType.getRequiredRole().equalsIgnoreCase(activeRole.replace("ROLE_", ""))) {
                throw new IllegalArgumentException(
                        "Cannot upload " + documentType.name() + " while logged in as " + activeRole
                );
            }
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
}