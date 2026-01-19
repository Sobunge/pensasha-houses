package com.pensasha.backend.modules.document;

import com.pensasha.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    // Root storage folder
    private static final Path STORAGE_ROOT = Paths.get("uploads").toAbsolutePath().normalize();

    /* ===================== UPLOAD ===================== */
    public Document uploadDocument(
            MultipartFile file,
            String documentType,
            User user) throws IOException {

        if (file == null || file.isEmpty())
            throw new IllegalArgumentException("Uploaded file must not be empty");
        if (documentType == null || documentType.isBlank())
            throw new IllegalArgumentException("Document type is required");
        if (user == null)
            throw new IllegalArgumentException("User is required");

        Files.createDirectories(STORAGE_ROOT);

        // Get original extension
        String extension = "";
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Generate a unique storage key using document type + UUID
        String safeDocType = documentType.toLowerCase().replaceAll("\\s+", "_");
        String storageKey = safeDocType + "_" + UUID.randomUUID() + extension;

        Path targetPath = STORAGE_ROOT.resolve(storageKey);

        // Save the file
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        // Save record in DB
        Document document = new Document(
                documentType, // user-friendly name
                storageKey, // stored filename
                file.getContentType() != null ? file.getContentType() : "application/octet-stream",
                file.getSize(),
                storageKey,
                user);

        return documentRepository.save(document);
    }

    /* ===================== READ ===================== */
    public List<Document> getDocumentsForUser(Long userId) {
        if (userId == null)
            throw new IllegalArgumentException("User ID is required");
        return documentRepository.findAllByUser_Id(userId);
    }

    /* ===================== GET SINGLE DOCUMENT ===================== */
    public Document getDocument(UUID documentId, User user) {
        if (documentId == null)
            throw new IllegalArgumentException("Document ID is required");
        if (user == null)
            throw new IllegalArgumentException("User is required");

        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new IllegalArgumentException("Document not found"));

        if (!document.getUser().getId().equals(user.getId()))
            throw new SecurityException("Not authorized to access this document");

        return document;
    }

    /* ===================== GET FILE PATH ===================== */
    public Path getDocumentPath(Document document) {
        if (document == null)
            throw new IllegalArgumentException("Document is required");
        return STORAGE_ROOT.resolve(document.getStorageKey()).normalize();
    }

    /* ===================== DELETE ===================== */
    public void deleteDocument(UUID documentId, User user) {
        Document document = getDocument(documentId, user);

        Path filePath = getDocumentPath(document);

        try {
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            // Optional: log error. Failure to delete should not block DB cleanup
        }

        documentRepository.delete(document);
    }

    /* ===================== COUNT ===================== */
    public long countDocumentsForUser(Long userId) {
        if (userId == null)
            throw new IllegalArgumentException("User ID is required");
        return documentRepository.countByUser_Id(userId);
    }
}
