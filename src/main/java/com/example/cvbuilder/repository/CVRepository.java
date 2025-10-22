package com.example.cvbuilder.repository;

import com.example.cvbuilder.model.CV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // Đánh dấu đây là Repository để Spring quản lý
public interface CVRepository extends JpaRepository<CV, Long> {

    //  Tìm kiếm tên gần đúng (không phân biệt hoa thường)
    List<CV> findByFullNameContainingIgnoreCase(String keyword);

    //  Tìm kiếm theo vị trí ứng tuyển
    List<CV> findByJobTitleContainingIgnoreCase(String jobTitle);

    //  Tìm theo email chính xác
    List<CV> findByEmailIgnoreCase(String email);

    List<CV> findByUserId(Long userId);
    List<CV> findByUserIdAndFullNameContainingIgnoreCase(Long userId, String keyword);

}
