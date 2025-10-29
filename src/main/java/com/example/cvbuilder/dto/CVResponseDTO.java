package com.example.cvbuilder.dto;

import com.example.cvbuilder.model.CV;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CVResponseDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String jobTitle;
    private String careerObjective;
    private String profileSummary;
    private String experience;
    private String education;
    private String skills;
    private String certifications;
    private String projects;
    private String languages;
    private String linkedIn;
    private String github;
    private String websiteUrl;
    private String avatarUrl;
    private String dateOfBirth;

    // Constructor nhận từ entity CV
    public CVResponseDTO(CV cv) {
        this.id = cv.getId();
        this.fullName = cv.getFullName();
        this.email = cv.getEmail();
        this.phone = cv.getPhone();
        this.address = cv.getAddress();
        this.jobTitle = cv.getJobTitle();
        this.careerObjective = cv.getCareerObjective();
        this.profileSummary = cv.getProfileSummary();
        this.experience = cv.getExperience();
        this.education = cv.getEducation();
        this.skills = cv.getSkills();
        this.certifications = cv.getCertifications();
        this.projects = cv.getProjects();
        this.languages = cv.getLanguages();
        this.linkedIn = cv.getLinkedIn();
        this.github = cv.getGithub();
        this.websiteUrl = cv.getWebsiteUrl();
    this.avatarUrl = cv.getAvatarUrl();
        this.dateOfBirth = String.valueOf(cv.getDateOfBirth());
    }

    // Getter & Setter (có thể dùng Lombok @Data nếu thích)
    // ... hoặc để IDE generate
}
