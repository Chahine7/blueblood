package com.blueblood.taskmanagement.task;

import com.blueblood.taskmanagement.common.BasicCrudOperationsDAO;
import com.blueblood.taskmanagement.exceptions.RequestValidationException;
import com.blueblood.taskmanagement.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TaskService {
   private final BasicCrudOperationsDAO<Task> taskDAO;
    private final TaskDTOMapper taskDTOMapper;

    public TaskService(BasicCrudOperationsDAO<Task> taskDAO, TaskDTOMapper taskDTOMapper) {
        this.taskDAO = taskDAO;
        this.taskDTOMapper = taskDTOMapper;
    }

    public List<TaskDTO> getAllTasks(Boolean completed, String sortBy, String order) {
        Stream<Task> taskStream = taskDAO.findAll().stream();

        if (completed != null) {
            taskStream = taskStream.filter(task -> task.isCompleted() == completed);
        }

        if (sortBy != null) {
            Comparator<Task> comparator = getTaskComparator(sortBy, order);
            taskStream = taskStream.sorted(comparator);
        }

        return taskStream.map(taskDTOMapper)
                .collect(Collectors.toList());
    }

    private static Comparator<Task> getTaskComparator(String sortBy, String order) {
        Comparator<Task> comparator = switch (sortBy) {
            case "creationDate" -> Comparator.comparing(Task::getCreatedAt);
            case "name" -> Comparator.comparing(Task::getName);
            default -> throw new RequestValidationException("Invalid sortBy field: " + sortBy);
        };
        if ("desc".equalsIgnoreCase(order)) {
            comparator = comparator.reversed();
        }
        return comparator;
    }


    public Integer addTask(AddTaskRequest addTaskRequest) {
        Task task = new Task(addTaskRequest.name(), addTaskRequest.description(), false, LocalDateTime.now());

        taskDAO.insertEntity(task);

        return task.getId();

    }

    public void deleteTaskById(Integer taskId) {
        if(!taskDAO.existsEntityWithId(taskId)){
            throw new ResourceNotFoundException(
                    String.format("Task with id [%s] does not exist", taskId)
            );
        }
        taskDAO.deleteEntityById(taskId);
    }

    public TaskDTO getTaskById(Integer taskId){
        return taskDAO.getEntityById(taskId)
                .map(taskDTOMapper).orElseThrow(() -> new ResourceNotFoundException(
                        String.format("Task with id [%s] does not exist", taskId)
                ));
    }

    public void updateTask(Integer taskId, TaskUpdateRequest updateRequest) {
        Task task =  taskDAO.getEntityById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        String.format("Task with id [%s] does not exist", taskId)
                ));
        boolean changed = false;
        if(updateRequest.name() != null && !updateRequest.name().equals(task.getName())){
            task.setName(updateRequest.name());
            changed = true;
        }
        if(updateRequest.description() != null && !updateRequest.description().equals(task.getDescription())){
            task.setDescription(updateRequest.description());
            changed = true;
        }
        if (updateRequest.completed() != task.isCompleted()) {
            task.setCompleted(updateRequest.completed());
            changed = true;
        }
        if(!changed) {
            throw new RequestValidationException(
                    "No change detected"
            );
        }
        taskDAO.updateEntity(task);
    }
}
