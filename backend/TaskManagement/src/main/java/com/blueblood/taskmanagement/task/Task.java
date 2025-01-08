package com.blueblood.taskmanagement.task;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Task {

    @Id
    @SequenceGenerator(
            name = "task_id_sequence",
            sequenceName = "task_id_sequence"
    )
    @GeneratedValue(
            strategy = jakarta.persistence.GenerationType.SEQUENCE,
            generator = "task_id_sequence"
    )
    private Integer id;

    @NotEmpty(message = "Task name cannot be empty")
    private String name;

    private String description;

    private boolean completed;

    private LocalDateTime createdAt;

    public Task() {
    }

    public Task(String name, String description, boolean completed, LocalDateTime createdAt) {
        this.name = name;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", completed=" + completed +
                ", createdAt=" + createdAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;

        Task task = (Task) o;
        return completed == task.completed && Objects.equals(id, task.id) && Objects.equals(name, task.name) && Objects.equals(description, task.description) && Objects.equals(createdAt, task.createdAt);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(id);
        result = 31 * result + Objects.hashCode(name);
        result = 31 * result + Objects.hashCode(description);
        result = 31 * result + Boolean.hashCode(completed);
        result = 31 * result + Objects.hashCode(createdAt);
        return result;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
