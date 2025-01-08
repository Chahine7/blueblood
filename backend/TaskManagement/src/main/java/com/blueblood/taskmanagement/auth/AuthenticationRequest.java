package com.blueblood.taskmanagement.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
}
