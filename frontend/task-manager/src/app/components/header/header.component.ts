import { Component } from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    NgIf,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
/*
  isLoggedIn(): boolean {

    return !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }*/
}
