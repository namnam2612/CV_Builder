package com.example.cvbuilder.controller;


import com.example.cvbuilder.auth.AuthRequest;
import com.example.cvbuilder.auth.AuthResponse;
import com.example.cvbuilder.auth.UserProfileResponse;
import com.example.cvbuilder.model.User;
import com.example.cvbuilder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


/**
 * Controller xử lý các yêu cầu xác thực người dùng (login, register)
 */
@RestController
@RequestMapping("/api/auth") // Tất cả endpoint sẽ bắt đầu bằng /api/auth
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * API đăng ký người dùng mới
     * @param request gồm username và password
     * @return token JWT nếu đăng ký thành công
     */

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    /**
     * API đăng nhập người dùng
     * @param request gồm username và password
     * @return token JWT nếu đăng nhập thành công
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserProfileResponse response = new UserProfileResponse(
                user.getUsername(),
                user.getFullName(),
                user.getEmail()
        );
        return ResponseEntity.ok(response);
    }
}
