package com.pensasha.backend.modules.document;

import com.pensasha.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // File metadata
    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = false)
    private String fileUrl; // Can be a server path or cloud storage link

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    // Many documents can belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Convenient constructor for creating a new document
    public Document(String fileName, String fileType, String fileUrl, User user) {
        this.fileName = fileName != null ? fileName : "unknown";
        this.fileType = fileType != null ? fileType : "application/octet-stream";
        this.fileUrl = fileUrl != null ? fileUrl : "";
        this.user = user;
        this.uploadedAt = LocalDateTime.now();
    }
}
