// src/main/java/com/example/cvbuilder/controller/WebController.java

/**

 * */

package com.example.cvbuilder.controller;

import com.example.cvbuilder.model.CV;
import com.example.cvbuilder.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.List;

@Controller
public class WebController {

    @Autowired
    private CVService cvService;

    @GetMapping("/")
    public String home() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // Trả về file templates/login.html
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Trả về file templates/register.html
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        // Lấy danh sách CV của người dùng hiện tại và đưa vào model
        List<CV> cvs = cvService.getAllCVs();
        model.addAttribute("cvs", cvs);
        return "dashboard"; // Trả về file templates/dashboard.html
    }
}