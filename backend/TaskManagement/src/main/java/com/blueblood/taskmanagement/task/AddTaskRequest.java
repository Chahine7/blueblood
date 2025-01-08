package com.blueblood.taskmanagement.task;

public record AddTaskRequest(
        String name,
        String description,
        boolean completed
) {
}
