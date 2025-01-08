package com.blueblood.taskmanagement.common;

import com.blueblood.taskmanagement.task.Task;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface BasicCrudOperationsDAO <T> {
    List<T> findAll();

    Optional<T> getEntityById(Integer id);

    void insertEntity(T entity);

    void deleteEntityById(Integer id);

    void updateEntity(T entity);

    boolean existsEntityWithId(Integer taskId);

    List<Task> getTasksForLoggedInUser(Integer userId);
}
