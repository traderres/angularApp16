package com.lessons.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterUserDTO {

    @JsonProperty("email")
    private String email;

    @JsonProperty("username")
    private String username;


    // ------------------------------ Getters & Setters -----------------------------

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
