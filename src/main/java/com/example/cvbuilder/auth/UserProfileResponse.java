package com.example.cvbuilder.auth;

public class UserProfileResponse {
    private String username;
    private String fullName;
    private String email;

    public UserProfileResponse(String username, String fullName, String email) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
    }

    public String getUsername() { return username; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
}
