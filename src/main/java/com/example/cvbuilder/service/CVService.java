package com.example.cvbuilder.service;

import com.example.cvbuilder.model.CV;
import com.example.cvbuilder.model.User;
import com.example.cvbuilder.repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.cvbuilder.service.CVScoringService;
import com.example.cvbuilder.service.AIGenerationService;


import java.util.List;
import java.util.Optional;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    // === CRUD ===

    public CV createCV(CV cv) {
        validateCV(cv);
        cv.setUser(getCurrentUser());
        return cvRepository.save(cv);
    }

    public List<CV> getAllCVs() {
        return cvRepository.findByUserId(getCurrentUser().getId()); // ✅ Truy vấn chủ động, tránh lazy loading
    }


    public Optional<CV> getCVById(Long id) {
        Optional<CV> cv = cvRepository.findById(id);
        if (cv.isPresent() && cv.get().getUser().getId() == getCurrentUser().getId() ) {
            return cv;
        }
        return Optional.empty();
    }

    public CV updateCV(Long id, CV updatedCV) {
        Optional<CV> existing = getCVById(id);
        if (existing.isPresent()) {
            updatedCV.setId(id);
            updatedCV.setUser(getCurrentUser());
            validateCV(updatedCV);
            return cvRepository.save(updatedCV);
        } else {
            return null;
        }
    }

    public boolean deleteCV(Long id) {
        Optional<CV> cv = getCVById(id);
        if (cv.isPresent()) {
            cvRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    // === Tìm kiếm nâng cao ===

    public List<CV> searchByFullName(String keyword) {
        return cvRepository.findByFullNameContainingIgnoreCase(keyword);
    }

    public List<CV> findByJobTitle(String jobTitle) {
        return cvRepository.findByJobTitleContainingIgnoreCase(jobTitle);
    }

    public List<CV> findByEmail(String email) {
        return cvRepository.findByEmailIgnoreCase(email);
    }

    public List<CV> getAllCVsSortedByCreatedAt() {
        return cvRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // === Kiểm tra dữ liệu ===

    public void validateCV(CV cv) {
        if (cv.getFullName() == null || cv.getFullName().isEmpty()) {
            throw new IllegalArgumentException("Họ tên không được để trống.");
        }
        if (cv.getEmail() == null || !cv.getEmail().contains("@")) {
            throw new IllegalArgumentException("Email không hợp lệ.");
        }
    }

    // === Tính điểm CV (demo) ===

    @Autowired
    private CVScoringService scoringService;


    // === Gợi ý mục tiêu nghề nghiệp (giả lập AI) ===
    @Autowired
    private AIGenerationService aiGenerationService;

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof com.example.cvbuilder.sercurity.UserPrincipal userPrincipal) {
            return userPrincipal.getUser(); // ✅ Lấy ra user gốc
        }
        throw new RuntimeException("Không xác thực được người dùng");
    }


    public List<CV> getCVsByUser(Long userId) {
        return cvRepository.findByUserId(userId);
    }

    public List<CV> searchMyCVsByName(Long userId, String keyword) {
        return cvRepository.findByUserIdAndFullNameContainingIgnoreCase(userId, keyword);
    }


}
