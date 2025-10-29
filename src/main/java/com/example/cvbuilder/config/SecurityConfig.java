package com.example.cvbuilder.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.cvbuilder.sercurity.JwtAuthFilter;

/**
 * Cấu hình bảo mật Spring Security cho ứng dụng
 */
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF
                .csrf(AbstractHttpConfigurer::disable)
                
                // SỬA DÒNG NÀY - phải dùng corsConfigurationSource()
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                
                // Authorization rules
                .authorizeHttpRequests(auth -> auth
                        // QUAN TRỌNG: /uploads/** phải lên TRƯỚC
                        .requestMatchers(
                            "/uploads/**",              // Static uploaded files
                            "/api/upload",              // Upload endpoint
                            "/api/upload/**",           // Upload sub-paths
                            "/api/debug/**",            // Debug endpoints
                            "/api/auth/**",             // Auth endpoints
                            "/",                        // Root
                            "/index.html",
                            "/assets/**",
                            "/vite.svg",
                            "/dashboard"
                        ).permitAll()

                        // API CV requires authentication
                        .requestMatchers("/api/cv/**").authenticated()

                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                
                // Stateless session
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                
                // Add JWT filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}