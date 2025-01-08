package com.blueblood.taskmanagement.task;

import java.time.LocalDateTime;

public record TaskDTO(
        Integer id,
        String  name,
        String description,
        boolean completed,
        LocalDateTime createdAt
) {
}
