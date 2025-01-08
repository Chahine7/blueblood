import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {Router} from "@angular/router";
import {UserRegistrationRequest} from "../../models/user-registration-request";
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,

  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{

  userRegistrationRequest: UserRegistrationRequest = {}
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }


  login() {
    this.router.navigate(['/login'])
  }

  register() {
   const registerSub = this.authService.registerUser(this.userRegistrationRequest)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
   this.subscriptions.add(registerSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
