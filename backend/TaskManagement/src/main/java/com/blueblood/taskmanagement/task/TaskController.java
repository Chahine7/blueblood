package com.blueblood.taskmanagement.task;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin("http://localhost:4200")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<TaskDTO> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("{taskId}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Integer taskId) {
        TaskDTO task = taskService.getTaskById(taskId);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Integer> addTask(@RequestBody AddTaskRequest addTaskRequest) {
        Integer taskId = taskService.addTask(addTaskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(taskId);
    }
    @DeleteMapping("{taskId}")
    public void deleteTask(@PathVariable("taskId") Integer taskId){
        taskService.deleteTaskById(taskId);
    }

    @PutMapping("{taskId}")
    public void updateTask(@PathVariable("taskId") Integer taskId,
                               @RequestBody TaskUpdateRequest updateRequest){
        taskService.updateTask(taskId, updateRequest);
    }
}
