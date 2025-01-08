package com.blueblood.taskmanagement.task;

import com.blueblood.taskmanagement.common.BasicCrudOperationsDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TaskDataAccessService implements BasicCrudOperationsDAO<Task> {
    private final TaskRepository taskRepository;

    public TaskDataAccessService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> getEntityById(Integer id) {
        return taskRepository.findById(id);
    }

    @Override
    public void insertEntity(Task entity) {
        taskRepository.save(entity);
    }

    @Override
    public void deleteEntityById(Integer id) {
        taskRepository.deleteById(id);
    }

    @Override
    public void updateEntity(Task entity) {
        taskRepository.save(entity);
    }

    @Override
    public boolean existsEntityWithId(Integer taskId) {
        return taskRepository.existsTaskById(taskId);
    }

    @Override
    public List<Task> getTasksForLoggedInUser(Integer userId) {
        return taskRepository.findAllByUserId(userId);
    }
}
