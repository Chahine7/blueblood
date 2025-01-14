import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MenubarModule} from "primeng/menubar";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {HeaderComponent} from "./components/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, SidebarModule, ButtonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Task Manager';
}
