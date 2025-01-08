package com.blueblood.taskmanagement.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

boolean existsTaskById(Integer taskId);

    List<Task> findAllByUserId(Integer userId);
}
