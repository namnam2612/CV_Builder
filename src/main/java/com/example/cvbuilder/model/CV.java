package com.example.cvbuilder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "cvs")
public class CV {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== Thông tin cá nhân =====
    @Column(nullable = false)
    private String fullName;

    private String email;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String avatarUrl;

    // ===== Mục tiêu và vị trí =====
    private String jobTitle;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String careerObjective;

    // ===== Tóm tắt bản thân =====
    @Lob
    @Column(columnDefinition = "TEXT")
    private String profileSummary;

    // ===== Nội dung chính =====
    @Lob
    @Column(columnDefinition = "TEXT")
    private String experience;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String education;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String skills;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String certifications;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String projects;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String languages;

    // ===== Mạng xã hội / liên kết =====
    private String linkedIn;
    private String github;
    private String websiteUrl;

    // ===== Thời điểm tạo =====
    @CreationTimestamp
    private LocalDateTime createdAt;

    // ===== Constructor =====
    public CV() {}

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // ===== Getter & Setter đầy đủ =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getCareerObjective() { return careerObjective; }
    public void setCareerObjective(String careerObjective) { this.careerObjective = careerObjective; }

    public String getProfileSummary() { return profileSummary; }
    public void setProfileSummary(String profileSummary) { this.profileSummary = profileSummary; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getCertifications() { return certifications; }
    public void setCertifications(String certifications) { this.certifications = certifications; }

    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }

    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }

    public String getLinkedIn() { return linkedIn; }
    public void setLinkedIn(String linkedIn) { this.linkedIn = linkedIn; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore // ⛔ Ngăn trả user -> tránh vòng lặp
    private User user;
}
