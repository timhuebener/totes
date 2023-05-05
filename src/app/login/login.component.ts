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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    readonly snackBar: MatSnackBar
  ) {}

  public login() {
    if (!this.loginForm.valid) {
      this.snackBar.open('the email is invalid', 'close', {
        // duration: 900,
        verticalPosition: 'top',
        panelClass: 'warn-snackbar',
      });
      return;
    }

    this.isLoading = true;
    const data = this.loginForm.getRawValue();
    this.auth
      .login(data.email, data.password)
      .then(() => {
        this.snackBar.open('Logged In', 'close', {
          duration: 900,
          verticalPosition: 'top',
          panelClass: 'success-snackbar',
        });
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.isLoading = false;
        this.snackBar.open('email or password was incorrect', 'close', {
          duration: 900,
          verticalPosition: 'top',
          panelClass: 'error-snackbar',
        });
      });
  }
}
