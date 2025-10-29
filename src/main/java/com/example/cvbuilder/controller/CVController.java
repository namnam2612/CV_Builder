package com.example.cvbuilder.controller;
import com.example.cvbuilder.model.CV;
import com.example.cvbuilder.service.CVService;
import com.example.cvbuilder.service.PdfExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.cvbuilder.service.CVScoringService;
import com.example.cvbuilder.service.AIGenerationService;
import com.example.cvbuilder.dto.CVResponseDTO;
import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/cv") // Tất cả endpoint sẽ bắt đầu với /api/cv
public class CVController {

    @Autowired
    private CVService cvService;
    @Autowired
    private CVScoringService cvScoringService;
    @Autowired
    private AIGenerationService aiGenerationService;

    // === Tạo mới CV ===
    @PostMapping(produces = "application/json")
    public ResponseEntity<CVResponseDTO> createCV(@RequestBody CV cv) {
        CV created = cvService.createCV(cv);
        return ResponseEntity.ok().body(new CVResponseDTO(created));
    }

    // === Lấy tất cả CV ===
    @GetMapping
    public ResponseEntity<List<CVResponseDTO>> getAllCVs() {

        List<CV> cvs = cvService.getAllCVs();
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }

    // === Lấy CV theo ID ===
    @GetMapping("/{id}")
    public ResponseEntity<CVResponseDTO> getCVById(@PathVariable Long id) {
        return cvService.getCVById(id)
                .map(cv -> ResponseEntity.ok(new CVResponseDTO(cv)))
                .orElse(ResponseEntity.notFound().build());
    }

    // === Cập nhật CV ===
    @PutMapping("/{id}")
    public ResponseEntity<CVResponseDTO> updateCV(@PathVariable Long id, @RequestBody CV updatedCV) {
        CV updated = cvService.updateCV(id, updatedCV);
        if (updated != null) {
            return ResponseEntity.ok(new CVResponseDTO(updated));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // === Xoá CV ===
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCV(@PathVariable Long id) {
        boolean deleted = cvService.deleteCV(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // === Tìm kiếm theo tên ===
    @GetMapping("/search")
    public ResponseEntity<List<CVResponseDTO>> searchByName(@RequestParam String name) {
        List<CV> cvs = cvService.searchByFullName(name);
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }

    // === Tìm theo vị trí ứng tuyển ===
    @GetMapping("/job")
    public ResponseEntity<List<CVResponseDTO>> findByJobTitle(@RequestParam String title) {
        List<CV> cvs = cvService.findByJobTitle(title);
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }

    // === Tìm theo email ===
    @GetMapping("/email")
    public ResponseEntity<List<CVResponseDTO>> findByEmail(@RequestParam String email) {
        List<CV> cvs = cvService.findByEmail(email);
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }

    // === Lấy tất cả và sắp xếp theo ngày tạo mới nhất ===
    @GetMapping("/sort")
    public ResponseEntity<List<CVResponseDTO>> sortByCreatedAt() {
        List<CV> cvs = cvService.getAllCVsSortedByCreatedAt();
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }

    // === Chấm điểm CV ===
    @GetMapping("/score/{id}")
    public ResponseEntity<Integer> scoreCV(@PathVariable Long id) {
        return cvService.getCVById(id)
                .map(cv -> ResponseEntity.ok(cvScoringService.score(cv))) // ✅ gọi trực tiếp scoringService
                .orElse(ResponseEntity.notFound().build());
    }

    // === Gợi ý mục tiêu nghề nghiệp ===
    @GetMapping("/suggest-objective/{id}")
    public ResponseEntity<String> suggestObjective(@PathVariable Long id) {
        return cvService.getCVById(id)
                .map(cv -> ResponseEntity.ok(aiGenerationService.suggestCareerObjective(cv.getJobTitle()))) // ✅ truyền jobTitle vào
                .orElse(ResponseEntity.notFound().build());
    }

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof com.example.cvbuilder.sercurity.UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        throw new RuntimeException("Không xác thực được người dùng");
    }

    @GetMapping("/my-cvs")
    public ResponseEntity<List<CVResponseDTO>> getMyCVs() {
        Long userId = getCurrentUserId();
        List<CV> cvs = cvService.getCVsByUser(userId);
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/my-cvs/search")
    public ResponseEntity<List<CVResponseDTO>> searchMyCVs(@RequestParam String name) {
        Long userId = getCurrentUserId();
        List<CV> cvs = cvService.searchMyCVsByName(userId, name);
        List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
        return ResponseEntity.ok(dtoList);
    }

    @Autowired
    private PdfExportService pdfExportService;

    @GetMapping("/{id}/export")
    public ResponseEntity<byte[]> exportCVToPdf(@PathVariable Long id) {
        return cvService.getCVById(id)
                .map(cv -> {
                    ByteArrayInputStream bis = pdfExportService.exportCVToPdf(cv);
                    return ResponseEntity.ok()
                            .header("Content-Disposition", "attachment; filename=cv_" + id + ".pdf")
                            .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                            .body(bis.readAllBytes());
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
}
