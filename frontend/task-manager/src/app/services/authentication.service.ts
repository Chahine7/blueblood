import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationRequest } from "../models/authentication-request";
import { UserRegistrationRequest } from "../models/user-registration-request";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(authRequest: AuthenticationRequest): Observable<AuthenticatorResponse> {
    return this.http.post<AuthenticatorResponse>(this.apiUrl + '/login', authRequest);
  }

  registerUser(user: UserRegistrationRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', user);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;

  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

}
