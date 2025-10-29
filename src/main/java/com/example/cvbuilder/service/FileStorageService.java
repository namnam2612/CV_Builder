package com.example.cvbuilder.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);

    private final Path uploadDir;

    public FileStorageService() throws IOException {
        this.uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadDir);
        logger.info("Upload directory initialized: {}", uploadDir.toString());
    }

    /**
     * Store the given multipart file in the uploads folder and return the public path (e.g. /uploads/uuid.png)
     * @throws IllegalArgumentException if the file is not an image
     */
    public String storeFile(MultipartFile file) throws IOException {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        String original = file.getOriginalFilename();
        String ext = "";
        if (original != null && original.contains(".")) {
            ext = original.substring(original.lastIndexOf('.'));
        }
        String filename = UUID.randomUUID().toString() + ext;
        Path target = uploadDir.resolve(filename);
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        }
        logger.info("Stored uploaded file '{}' ({}) -> {}", original, contentType, target.toString());
        // Return only the filename. The public URL is constructed by the controller
        // based on the application's static resource mapping to avoid duplicated paths.
        return filename;
    }
    
    /**
     * Load a file as a Spring Resource for serving back to clients
     * @throws IOException if the file does not exist
     */
    public Resource loadFileAsResource(String filename) throws IOException {
        Path filePath = uploadDir.resolve(filename).normalize();
        Resource resource = new FileSystemResource(filePath.toFile());
        
        if(resource.exists()) {
            return resource;
        } else {
            throw new IOException("File not found: " + filename);
        }
    }
}
