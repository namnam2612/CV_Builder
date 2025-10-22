package com.example.cvbuilder.sercurity;

import com.example.cvbuilder.model.User;
import com.example.cvbuilder.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


/**
 * Bộ lọc xác thực JWT chạy trước khi controller xử lý request.
 * Mục tiêu: kiểm tra token từ header Authorization, xác thực người dùng nếu token hợp lệ.
 */
@Component // đánh dấu class này là một bean để Spring quản lý. Nó sẽ được tự động khởi tạo và đưa vào context.
public class JwtAuthFilter extends OncePerRequestFilter {  //OncePerRequestFilter là một class trong Spring Security đảm bảo filter chỉ chạy một lần duy nhất cho
                                                            // mỗi request HTTP (tránh bị gọi nhiều lần trong cùng một request).

    @Autowired //Spring sẽ tự động tiêm một bean kiểu JwtService vào biến jwtService
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;







    /**
     @Override
     // là nơi bạn viết logic để kiểm tra request, ví dụ:
     //Lấy token từ header.
     //Xác thực token.
     //Nếu hợp lệ thì thiết lập thông tin người dùng cho SecurityContext.

     protected void doFilterInternal(HttpServletRequest request, // chứa thông tin request từ client
     HttpServletResponse response, //để viết phản hồi trả lại client nếu cần (ví dụ: lỗi xác thực).
     FilterChain filterChain) throws ServletException, IOException { //FilterChain filterChain là chuỗi filter tiếp theo. Sau khi bạn xử lý xong,
     // bạn cần gọi filterChain.doFilter(...) để tiếp tục luồng xử lý.

     String path = request.getServletPath();
     if (path.startsWith("/api/auth")) {
     filterChain.doFilter(request, response);
     return;
     }

     // Lấy header Authorization từ request
     final String authHeader = request.getHeader("Authorization");

     String token = null;
     String username = null;

     //Kiểm tra nếu header tồn tại và bắt đầu bằng "Bearer "
     if(authHeader != null && authHeader.startsWith("Bearer ")) {
     token = authHeader.substring(7); // Lấy phần token sau "Bearer "
     username = jwtService.extractUsername(token); // Trích xuất username từ token
     }

     // Nếu username hợp lệ và chưa được xác thực
     if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
     // Tìm người dùng trong cơ sở dữ liệu
     User user = userRepository.findByUsername(username).orElse(null);

     //Kiểm tra token có hợp lệ với user không
     if(user != null && jwtService.isTokenValid(token, user)) {
     // Tạo đối tượng xác thực và gán vào SecurityContext
     UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null, null);
     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
     SecurityContextHolder.getContext().setAuthentication(authToken);
     }
     }
     //Tiếp tục chuỗi filter
     filterChain.doFilter(request, response);
     }


     * */


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        //  Bỏ qua filter cho tất cả request KHÔNG bắt đầu bằng /api/
        if (!path.startsWith("/api/")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println(" [Filter] Yêu cầu tới: " + path);

        // Bỏ qua filter cho endpoint không cần bảo mật
        if (path.startsWith("/api/auth")) {
            System.out.println(" [Filter] Bỏ qua vì là endpoint auth");
            filterChain.doFilter(request, response);
            return;
        }

        // Lấy header Authorization
        final String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // Bỏ "Bearer "
            System.out.println(" [Filter] Token nhận được: " + token);
            try {
                username = jwtService.extractUsername(token);
                System.out.println("👤 [Filter] Username trích từ token: " + username);
            } catch (Exception e) {
                System.out.println(" [Filter] Token không hợp lệ: " + e.getMessage());
            }
        } else {
            System.out.println(" [Filter] Không tìm thấy header Authorization hoặc không đúng định dạng");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                System.out.println(" [Filter] User tồn tại trong DB: " + user.getUsername());
                boolean valid = jwtService.isTokenValid(token, user);
                System.out.println("[Filter] Token hợp lệ: " + valid);
                if (valid) {
                    UserPrincipal principal = new UserPrincipal(user);
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(principal, null, null);

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println(" [Filter] Xác thực thành công!");
                }
            } else {
                System.out.println(" [Filter] Không tìm thấy user trong DB");
            }
        }

        filterChain.doFilter(request, response);
    }


}
