// src/main/java/com/example/cvbuilder/controller/ViewController.java
package com.example.cvbuilder.controller;

import com.example.cvbuilder.dto.CVResponseDTO;
import com.example.cvbuilder.model.CV;
import com.example.cvbuilder.sercurity.UserPrincipal;
import com.example.cvbuilder.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ViewController {

    @Autowired
    private CVService cvService;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    @GetMapping("/create-cv")
    public String createCV() {
        return "create-cv";
    }

    @GetMapping("/my-cvs")
    public String myCVs(Model model) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal userPrincipal) {
            Long userId = userPrincipal.getId();
            List<CV> cvs = cvService.getCVsByUser(userId);
            List<CVResponseDTO> dtoList = cvs.stream().map(CVResponseDTO::new).toList();
            model.addAttribute("cvList", dtoList);
        } else {
            model.addAttribute("cvList", List.of());
        }
        return "my-cvs";
    }

    @GetMapping("/create-cv-ai")
    public String createCvAi() { return "create-cv-ai"; }

    // ✅ ENDPOINT MỚI BẠN VỪA THÊM VÀO
    @GetMapping("/editor")
    public String editorPage() {
        return "editor";
    }
}