package com.pensasha.backend.modules.document;

import com.pensasha.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    private static final Path STORAGE_ROOT = Paths.get("uploads").toAbsolutePath().normalize();

    /**
     * Store a file for a given user
     */
    public Document storeFile(MultipartFile file, User user) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }

        Files.createDirectories(STORAGE_ROOT);

        String originalFilename = file.getOriginalFilename();
        String cleanFilename = StringUtils.cleanPath(
                originalFilename != null ? originalFilename : "file");

        String storedFilename = UUID.randomUUID() + "_" + cleanFilename;

        Path targetPath = STORAGE_ROOT.resolve(storedFilename);

        Files.copy(
                file.getInputStream(),
                targetPath,
                StandardCopyOption.REPLACE_EXISTING);

        Document document = new Document();
        document.setFileName(cleanFilename);
        document.setFileType(
                file.getContentType() != null
                        ? file.getContentType()
                        : "application/octet-stream");
        document.setFileUrl(targetPath.toString());
        document.setUploadedAt(LocalDateTime.now());
        document.setUser(user);

        return documentRepository.save(document);
    }

    /**
     * Fetch all documents belonging to a specific user
     */
    public List<Document> getDocumentsForUser(Long userId) {
        return documentRepository.findByUserId(userId);
    }

    /**
     * Delete a document owned by the given user
     */
    public void deleteDocument(Long documentId, User user) {

        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new IllegalArgumentException("Document not found"));

        if (!document.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Not authorized to delete this document");
        }

        try {
            Files.deleteIfExists(Paths.get(document.getFileUrl()));
        } catch (IOException ignored) {
            // File deletion failure should not block DB cleanup
        }

        documentRepository.delete(document);
    }

    /**
     * Count documents for a specific user
     */
    public long countDocumentsForUser(Long userId) {
        return documentRepository.countByUserId(userId);
    }

}
