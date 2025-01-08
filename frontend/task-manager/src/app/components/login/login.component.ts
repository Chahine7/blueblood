import {Component, OnDestroy} from '@angular/core';

import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthenticationRequest} from "../../models/authentication-request";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    FormsModule,

    FormsModule,
    NgIf,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  authenticationRequest: AuthenticationRequest = {};
  private subscriptions: Subscription = new Subscription();

  errorMessage: string = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  login() {
    this.errorMessage='';
   const subscription = this.authService.login(this.authenticationRequest)
      .subscribe({
        next: (authenticationResponse) => {
          localStorage.setItem("user", JSON.stringify(authenticationResponse));
          this.router.navigate([""]).then(r =>{

          });
        },
        error: (err) => {
          if(err.error.statusCode === 401){
            this.errorMessage = "email et/ou le mot de passe est incorrect !";
          }
        }
      })
    this.subscriptions.add(subscription);
  }

  register() {
  this.router.navigate(['/register'])
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
