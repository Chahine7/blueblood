import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, map, startWith} from "rxjs";
import {TaskDTO} from "../models/TaskDTO";
import {AddTaskRequest} from "../models/AddTaskRequest";
import {TaskUpdateRequest} from "../models/TaskUpdateRequest";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(sortBy?: string, order?: string, completed?: boolean): Observable<TaskDTO[]> {
    let params = new HttpParams();

    if (sortBy) params = params.set('sortBy', sortBy);
    if (order) params = params.set('order', order);
    if (completed !== undefined) params = params.set('completed', completed.toString());

    return this.http.get<TaskDTO[]>(this.apiUrl, { params }).pipe(
      map((tasks) => tasks ?? []),
      startWith([])
    );
  }

  getTaskById(taskId: number): Observable<TaskDTO> {
    return this.http.get<TaskDTO>(`${this.apiUrl}/${taskId}`);
  }

  addTask(addTaskRequest: AddTaskRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, addTaskRequest);
  }

  updateTask(taskId: number, updateRequest: TaskUpdateRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${taskId}`, updateRequest);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
