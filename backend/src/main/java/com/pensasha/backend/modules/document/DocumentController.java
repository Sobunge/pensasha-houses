package com.pensasha.backend.modules.document;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.security.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final AuthUtils authUtils;

    /* ===================== UPLOAD ===================== */
    @PostMapping
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType,
            Authentication authentication
    ) throws IOException {

        User user = authUtils.getUser(authentication);

        Document savedDocument =
                documentService.uploadDocument(file, documentType, user);

        return ResponseEntity.status(201).body(savedDocument);
    }

    /* ===================== READ (MY DOCUMENTS) ===================== */
    @GetMapping("/me")
    public ResponseEntity<List<Document>> getMyDocuments(Authentication authentication) {

        User user = authUtils.getUser(authentication);

        List<Document> documents =
                documentService.getDocumentsForUser(user.getId());

        return ResponseEntity.ok(documents);
    }

    /* ===================== DOWNLOAD ===================== */
    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable UUID documentId,
            Authentication authentication
    ) throws MalformedURLException {

        User user = authUtils.getUser(authentication);

        Document document =
                documentService.getDocument(documentId, user);

        Path filePath =
                documentService.getDocumentPath(document);

        Resource resource =
                new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new IllegalStateException("File not found or not readable");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + document.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(document.getContentType()))
                .body(resource);
    }

    /* ===================== DELETE ===================== */
    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable UUID documentId,
            Authentication authentication
    ) {

        User user = authUtils.getUser(authentication);

        documentService.deleteDocument(documentId, user);

        return ResponseEntity.noContent().build();
    }

    /* ===================== COUNT ===================== */
    @GetMapping("/count/me")
    public ResponseEntity<Long> countMyDocuments(Authentication authentication) {

        User user = authUtils.getUser(authentication);

        long count =
                documentService.countDocumentsForUser(user.getId());

        return ResponseEntity.ok(count);
    }
}