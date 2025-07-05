package com.example.cvbuilder.service;

import com.example.cvbuilder.auth.AuthRequest;
import com.example.cvbuilder.auth.AuthResponse;
import com.example.cvbuilder.model.User;
import com.example.cvbuilder.repository.UserRepository;
import com.example.cvbuilder.sercurity.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtService jwtService;
    @Autowired private AuthenticationManager authenticationManager;

    // ======================= REGISTER =========================
    public AuthResponse register(AuthRequest request) {
        // Kiểm tra username đã tồn tại
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tên đăng nhập đã tồn tại");
        }

        // ✅ Validate dữ liệu đầu vào
        validateUsername(request.getUsername());
        validateEmail(request.getEmail());
        validatePassword(request.getPassword());

        // Tạo user mới
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        userRepository.save(user);

        // Tạo token JWT
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    // ======================= LOGIN =========================
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    // ======================= VALIDATION =========================

    private void validateUsername(String username) {
        if (username == null || username.length() < 4) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tên đăng nhập phải có ít nhất 4 ký tự");
        }
        if (!username.matches("^[a-zA-Z0-9_]+$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tên đăng nhập chỉ được chứa chữ, số và dấu gạch dưới");
        }
    }

    private void validateEmail(String email) {
        if (email == null || !email.matches("^[\\w.-]+@[\\w.-]+\\.\\w{2,}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email không hợp lệ");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu phải có ít nhất 6 ký tự");
        }
        if (!password.matches(".*[A-Za-z].*")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu phải chứa ít nhất một chữ cái");
        }
        if (!password.matches(".*\\d.*")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu phải chứa ít nhất một chữ số");
        }
    }
}
