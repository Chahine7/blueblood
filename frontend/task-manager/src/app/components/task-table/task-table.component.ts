import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import { SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Observable} from "rxjs";
import {TaskDTO} from "../../models/TaskDTO";
import {TaskService} from "../../services/task.service";
import {MessageModule} from "primeng/message";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";

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
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent implements OnInit {
  tasks$: Observable<TaskDTO[]> = new Observable<TaskDTO[]>();
  @Output() editTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();

  sortField: string = 'creationDate';
  sortOrder: number = 1;
  showCompleted: boolean = false;
  showNonCompleted: boolean = false;



  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  refreshTable() {
    this.loadTasks();
  }

  loadTasks(): void {
    const order = this.sortOrder === 1 ? 'asc' : 'desc';

    let filter : boolean | undefined;

    if (this.showCompleted && !this.showNonCompleted) {
      filter = true;
    } else if (this.showNonCompleted && !this.showCompleted) {
      filter = false;
    }

    this.tasks$ = this.taskService.getAllTasks(this.sortField, order, filter);
  }

  onSort(event: any) {
    if (this.sortField !== event.field || this.sortOrder !== event.order) {
      this.sortField = event.field;
      this.sortOrder = event.order;
      this.loadTasks();
    }
  }

  onEditTask(task: TaskDTO) {
    this.editTask.emit(task.id);
  }

  onDeleteTask(task: TaskDTO) {
    this.deleteTask.emit(task.id);
  }
}
