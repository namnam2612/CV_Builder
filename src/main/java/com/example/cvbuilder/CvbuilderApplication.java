// src/main/java/com/example/cvbuilder/CvbuilderApplication.java

package com.example.cvbuilder; // <-- SỬA LỖI 1: Sửa lại package cho đúng

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// LỖI 2: Tên lớp của bạn là "CvbuilderApplication" (chữ b thường)
// Trong khi lỗi báo rằng nó đang tìm "CvbuilderApplication" (chữ B hoa).
// Tên lớp phải khớp chính xác với tên file.
public class CvbuilderApplication {

	public static void main(String[] args) {
		SpringApplication.run(CvbuilderApplication.class, args);
	}
}