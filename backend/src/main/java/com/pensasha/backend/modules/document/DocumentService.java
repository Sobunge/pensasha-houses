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

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    // Base folder to store uploaded files
    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

    /**
     * Store a file for a given user
     */
    public Document storeFile(MultipartFile file, User user) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store empty file");
        }

        // Ensure upload directory exists
        if (!Files.exists(fileStorageLocation)) {
            Files.createDirectories(fileStorageLocation);
        }

        // Clean and resolve filename
        String fileName = file.getOriginalFilename();
        String originalFileName = (fileName != null) ? StringUtils.cleanPath(fileName) : null;
        if (originalFileName == null || originalFileName.isBlank()) {
            originalFileName = "unnamed_file_" + System.currentTimeMillis();
        }

        Path targetLocation = fileStorageLocation.resolve(originalFileName);

        // Copy file to target location (replace if exists)
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Create and save document entity
        Document document = new Document(
                originalFileName,
                file.getContentType() != null ? file.getContentType() : "application/octet-stream",
                targetLocation.toString(),
                user
        );
        document.setUploadedAt(LocalDateTime.now());

        return documentRepository.save(document);
    }

    /**
     * Fetch all documents belonging to a specific user
     */
    public List<Document> getDocumentsForUser(Long userId) {
        return documentRepository.findByUserId(userId);
    }

    /**
     * Delete a document by its ID
     */
    public void deleteDocument(Long documentId) {
        documentRepository.deleteById(documentId);
    }
}
