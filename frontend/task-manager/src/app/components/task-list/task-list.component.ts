import {Component, ViewChild} from '@angular/core';
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {TaskService} from "../../services/task.service";
import {MessageModule} from "primeng/message";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {AddTaskRequest} from "../../models/AddTaskRequest";
import {TaskTableComponent} from "../task-table/task-table.component";
import {NgIf} from "@angular/common";

import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TableModule,
    ChipsModule,
    DropdownModule,
    MessageModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    TaskTableComponent,
    NgIf,
    CheckboxModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @ViewChild(TaskTableComponent) taskTableComponent: TaskTableComponent | undefined;
  taskId :number = 0;
  visible: boolean = false;
  addTaskRequest: AddTaskRequest = { name: '', description: '', completed: false };
  isEditMode: boolean = false;
  deleteTaskVisible: boolean = false;
  constructor(private taskService: TaskService) {}

  showDialog() {
    this.isEditMode = false;
    this.addTaskRequest = { name: '', description: '', completed: false };
    this.visible = true;
  }


  onEditTask(taskId: number) {
    this.isEditMode = true;
    this.fetchTaskById(taskId);
  }
  private fetchTaskById(taskId: number) {
    this.taskService.getTaskById(taskId).subscribe((task) => {
      this.addTaskRequest = task;
      this.taskId =task.id;
      this.visible = true;
    });
  }

  saveTask() {
    if (this.isEditMode) {
      this.taskService.updateTask(this.taskId, this.addTaskRequest).subscribe({
        next: () => {
          this.visible = false;
          this.addTaskRequest = { name: '', description: '', completed: false };
          this.taskTableComponent?.refreshTable();
        },
        error: (error) => {
        },
      });
    } else {
      this.taskService.addTask(this.addTaskRequest).subscribe({
        next: (taskId) => {
          this.visible = false;
          this.addTaskRequest = { name: '', description: '', completed: false };
          this.taskTableComponent?.refreshTable();
        },
        error: (error) => {

        },
      });
    }
  }

  onDeleteTask(taskId: number) {
      this.deleteTaskVisible = true;
      this.taskId = taskId;
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).subscribe({
      next: () => {
        this.deleteTaskVisible = false;
        this.taskTableComponent?.refreshTable();
      },
      error: (error) => {
      }
    });
  }

}
