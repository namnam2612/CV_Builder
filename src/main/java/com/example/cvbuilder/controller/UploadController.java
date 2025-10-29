package com.example.cvbuilder.controller;

import java.nio.file.Files;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.cvbuilder.service.FileStorageService;

@RestController
@RequestMapping("/api")
public class UploadController {

    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    @Autowired
    private FileStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String filename = storageService.storeFile(file);
            // storageService now returns the plain filename (no /uploads/ prefix).
            // Our static resource mapping is configured to serve files from folder 'uploads' at the root,
            // so the public URL should be '/{filename}' (e.g. '/7054...jpg').
            // Public URL should use /uploads/{filename} so it matches WebConfig mapping
            String fileUrl = "/uploads/" + filename;
            logger.info("Upload successful. Returning public URL: {} (internal filename: {})", fileUrl, filename);
            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            logger.error("Upload failed", e);
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }
    /**
     * Debug: serve a stored upload via controller so we can verify content-type and existence.
     * Example: GET /api/upload/raw/abcd.png
     */
    @GetMapping("/upload/raw/{filename:.+}")
    public ResponseEntity<Resource> serveUpload(@PathVariable String filename) {
        try {
            Resource resource = storageService.loadFileAsResource(filename);
            String contentType = Files.probeContentType(resource.getFile().toPath());
            if (contentType == null) contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            logger.info("Serving file {} with content type {}", filename, contentType);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (Exception e) {
            logger.error("Error serving upload: " + filename, e);
            return ResponseEntity.notFound().build();
        }
    }
}
