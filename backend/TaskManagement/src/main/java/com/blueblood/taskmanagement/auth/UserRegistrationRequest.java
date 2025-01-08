package com.blueblood.taskmanagement.auth;

public record UserRegistrationRequest(
        String name,
        String email,
        String password) {
}
