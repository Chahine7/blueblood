import { Component } from '@angular/core';
import {TaskListComponent} from "../task-list/task-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TaskListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
