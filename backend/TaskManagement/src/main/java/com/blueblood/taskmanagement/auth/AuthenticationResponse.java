package com.blueblood.taskmanagement.auth;
public record AuthenticationResponse(
        String token,
        UserDTO userDTO

) {
}
