package com.example.cvbuilder.service;

import com.example.cvbuilder.model.CV;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import com.lowagie.text.Document;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfExportService {
    public ByteArrayInputStream exportCVToPdf(CV cv) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

            document.add(new Paragraph("CV - " + cv.getFullName(), titleFont));
            document.add(new Paragraph("Job Title: " + cv.getJobTitle(), normalFont));
            document.add(new Paragraph("Email: " + cv.getEmail(), normalFont));
            document.add(new Paragraph("Phone: " + cv.getPhone(), normalFont));
            document.add(new Paragraph("Address: " + cv.getAddress(), normalFont));
            document.add(new Paragraph("Date of Birth: " + cv.getDateOfBirth(), normalFont));
            document.add(new Paragraph("Career Objective: " + cv.getCareerObjective(), normalFont));
            document.add(new Paragraph("Profile Summary: " + cv.getProfileSummary(), normalFont));
            document.add(new Paragraph("Experience: " + cv.getExperience(), normalFont));
            document.add(new Paragraph("Education: " + cv.getEducation(), normalFont));
            document.add(new Paragraph("Skills: " + cv.getSkills(), normalFont));
            document.add(new Paragraph("Certifications: " + cv.getCertifications(), normalFont));
            document.add(new Paragraph("Projects: " + cv.getProjects(), normalFont));
            document.add(new Paragraph("Languages: " + cv.getLanguages(), normalFont));
            document.add(new Paragraph("LinkedIn: " + cv.getLinkedIn(), normalFont));
            document.add(new Paragraph("Github: " + cv.getGithub(), normalFont));
            document.add(new Paragraph("Website: " + cv.getWebsiteUrl(), normalFont));

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
