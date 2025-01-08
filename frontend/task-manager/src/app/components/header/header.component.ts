import { Component } from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {AuthenticationResponse} from "../../models/authentication-response";
import {JwtHelperService} from "@auth0/angular-jwt";

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
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const authResponse: AuthenticationResponse = JSON.parse(storedUser);
        const token = authResponse.token;
        if (token) {
          const jwtHelper = new JwtHelperService();
          return !jwtHelper.isTokenExpired(token);
        }
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem("user");
  }
}
