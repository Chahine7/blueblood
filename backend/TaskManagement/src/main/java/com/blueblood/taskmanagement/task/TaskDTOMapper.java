package com.blueblood.taskmanagement.task;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TaskDTOMapper implements Function<Task, TaskDTO> {
    @Override
    public TaskDTO apply(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getName(),
                task.getDescription(),
                task.isCompleted(),
                task.getCreatedAt()
        );
    }
}
