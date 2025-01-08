package com.blueblood.taskmanagement.auth;

import java.util.List;

public record UserDTO(
        Integer id,
        String name,
        String email,
        List<String> roles,
        String username
) {
}
