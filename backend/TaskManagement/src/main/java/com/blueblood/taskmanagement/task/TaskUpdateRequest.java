package com.blueblood.taskmanagement.task;

import java.time.LocalDateTime;

public record TaskUpdateRequest(
        String name,
        String description,
        boolean completed
) {
}
