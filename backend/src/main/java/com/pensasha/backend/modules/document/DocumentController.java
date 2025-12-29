package com.pensasha.backend.modules.document;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;

    /**
     * Upload a document for the authenticated user
     */
    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String idNumber = authentication.getName();

        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Document savedDocument = documentService.storeFile(file, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedDocument);
    }

    /**
     * Get all documents for the authenticated user
     */
    @GetMapping("/my")
    public ResponseEntity<List<Document>> getMyDocuments(Authentication authentication) {

        String idNumber = authentication.getName();

        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Document> documents = documentService.getDocumentsForUser(user.getId());

        return ResponseEntity.ok(documents);
    }

    /**
     * Delete a document by ID (owner only)
     */
    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long documentId,
            Authentication authentication) {

        String idNumber = authentication.getName();

        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        documentService.deleteDocument(documentId, user);

        return ResponseEntity.noContent().build();
    }

    /**
     * Get document count for a specific user
     */
    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> getDocumentCount(@PathVariable Long userId) {
        long count = documentService.countDocumentsForUser(userId);
        return ResponseEntity.ok(count);
    }
}
