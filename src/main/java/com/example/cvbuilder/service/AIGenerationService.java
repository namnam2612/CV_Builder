package com.example.cvbuilder.service;

import com.example.cvbuilder.model.CV;
import org.springframework.stereotype.Service;

@Service
public class AIGenerationService {

    public String suggestCareerObjective(String jobTitle) {
        if (jobTitle == null || jobTitle.isEmpty()) {
            return "Mục tiêu nghề nghiệp: Không xác định.";
        }
        return "Mục tiêu nghề nghiệp: Trở thành " + jobTitle + " chuyên nghiệp, đóng góp vào sự phát triển của công ty.";
    }
}
