package com.example.cvbuilder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    /**
     * Chuyển tiếp tất cả các yêu cầu không phải API (không chứa dấu chấm trong đường dẫn)
     * đến file index.html của ứng dụng React.
     * Điều này cho phép React Router ở phía frontend xử lý việc điều hướng.
     */
    @RequestMapping(value = {"/", "/{path:[^\\.]*}"})
    public String forward() {
        return "forward:/index.html";
    }
}