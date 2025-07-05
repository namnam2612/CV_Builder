package com.example.cvbuilder.service;

import com.example.cvbuilder.model.CV;
import org.springframework.stereotype.Service;

@Service
public class CVScoringService {

    public int score(CV cv) {
        int score = 0;
        if (cv.getSkills() != null) score += 10;
        if (cv.getExperience() != null) score += 15;
        if (cv.getEducation() != null) score += 10;
        if (cv.getProjects() != null) score += 10;
        if (cv.getCertifications() != null) score += 5;
        return score;
    }
}
