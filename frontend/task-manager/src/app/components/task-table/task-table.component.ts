import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import { SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Observable} from "rxjs";
import {TaskDTO} from "../../models/TaskDTO";
import {TaskService} from "../../services/task.service";
import {MessageModule} from "primeng/message";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgIf,
    SharedModule,
    TableModule,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent implements OnInit{
  tasks$: Observable<TaskDTO[]> = new Observable<TaskDTO[]>();
  @Output() editTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAllTasks();
  }

  refreshTable() {
    this.tasks$ = this.taskService.getAllTasks();
  }

  onEditTask(task: TaskDTO) {
      this.editTask.emit(task.id);
  }

  onDeleteTask(task: TaskDTO) {
      this.deleteTask.emit(task.id);
  }
}
