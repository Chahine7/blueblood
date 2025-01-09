package com.blueblood.taskmanagement.task;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;

import static org.mockito.Mockito.verify;

class TaskDataAccessServiceTest {

    private TaskDataAccessService underTest;
    private AutoCloseable autoCloseable;
    @Mock
    private TaskRepository taskRepository;
    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new TaskDataAccessService(taskRepository);
    }

    @AfterEach
    void tearDown() throws Exception{
        autoCloseable.close();
    }
    @Test
    void findAll() {
        //When

        underTest.findAll();
        //Then
        verify(taskRepository).findAll();
    }

    @Test
    void getEntityById() {
        //Given
        int id = 1 ;

        //When
underTest.getEntityById(id);
        //Then
        verify(taskRepository).findById(id);
    }

    @Test
    void insertEntity() {
        //Given
        Task task = new Task(1,"Test", "This is a test Task", true, LocalDateTime.now());

        //When
underTest.insertEntity(task);
        //Then
        verify(taskRepository).save(task);
    }

    @Test
    void deleteEntityById() {
        //Given
    int id = 1;

        //When
underTest.deleteEntityById(id);
        //Then
        verify(taskRepository).deleteById(id);
    }

    @Test
    void updateEntity() {
        //Given
        Task task = new Task(1,"Test 1", "This is a test Task", true, LocalDateTime.now());

        //When
underTest.updateEntity(task);
        //Then
        verify(taskRepository).save(task);
    }

    @Test
    void existsEntityWithId() {
        //Given
        int id = 1;

        //When
underTest.existsEntityWithId(id);

        //Then
        verify(taskRepository).existsTaskById(id);
    }

    @Test
    void getTasksForLoggedInUser() {
        //Given
        int id = 1;

        //When
        underTest.getTasksForLoggedInUser(id);
        //Then
        verify(taskRepository).findAllByUserId(id);
    }
}