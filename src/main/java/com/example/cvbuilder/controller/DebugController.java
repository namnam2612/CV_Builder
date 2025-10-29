package com.example.cvbuilder.controller;

import com.example.cvbuilder.dto.CVResponseDTO;
import com.example.cvbuilder.model.CV;
import com.example.cvbuilder.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Temporary debug controller to expose non-authenticated read-only endpoints for debugging data.
 * REMOVE THIS CONTROLLER BEFORE DEPLOYING TO PRODUCTION.
 */
@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private CVService cvService;

    @GetMapping("/cvs")
    public ResponseEntity<List<CVResponseDTO>> getAllCvs() {
        List<CV> cvs = cvService.getAllCVs();
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }
}
