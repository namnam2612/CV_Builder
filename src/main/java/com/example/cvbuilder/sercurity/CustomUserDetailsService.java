package com.example.cvbuilder.sercurity;

import com.example.cvbuilder.model.User;
import com.example.cvbuilder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

/**
 * Dịch vụ giúp Spring Security lấy thông tin người dùng từ database
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Spring gọi hàm này khi cần xác thực user
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng: " + username));

        return new UserPrincipal(user);
    }
    /**
     Spring Security sẽ tự động gọi loadUserByUsername khi xác thực.
     Trả về UserDetails, ở đây dùng org.springframework.security.core.userdetails.User.
     Chưa xử lý phân quyền (role), ta dùng Collections.emptyList() cho đơn giản.
     */
}
