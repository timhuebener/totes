import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isLoading = false;
  public loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.min(8), Validators.required],
    }),
  });

  constructor(readonly auth: AuthService, readonly router: Router) {}

  public login() {
    if (!this.loginForm.valid) {
      console.info('the login form is not valid');
      return;
    }

    this.isLoading = true;
    const data = this.loginForm.getRawValue();
    this.auth
      .login(data.email, data.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((err) => console.log(err));
  }
}
