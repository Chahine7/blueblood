package com.blueblood.taskmanagement.task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {

boolean existsTaskById(Integer taskId);
}
