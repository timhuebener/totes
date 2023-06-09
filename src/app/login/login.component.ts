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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
  ],
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

  constructor(
    readonly auth: AuthService,
    readonly router: Router,
    readonly snackBar: SnackBarService
  ) {}

  public login() {
    if (!this.loginForm.valid) {
      this.snackBar.warn('the email is invalid');
      return;
    }

    this.isLoading = true;
    const data = this.loginForm.getRawValue();
    this.auth
      .login(data.email, data.password)
      .then(() => {
        this.snackBar.success('welcome! 🎉');
        this.auth.authStatus.set(true);
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.snackBar.error('username or password is incorrect');
        this.isLoading = false;
      });
  }
}
