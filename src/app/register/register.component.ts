import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { pb } from '../pocketbase';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.min(8), Validators.required],
    }),
    passwordConfirm: new FormControl('', {
      nonNullable: true,
      validators: [Validators.min(8), Validators.required],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(readonly auth: AuthService, readonly router: Router) {}

  public register() {
    if (!this.registerForm.valid) {
      console.info('the register form is not valid');
      return;
    }

    const data = this.registerForm.getRawValue();

    if (data.password != data.passwordConfirm) {
      console.info('the passwords are not the same');
      return;
    }

    this.auth
      .register(data.username, data.email, data.password, data.passwordConfirm)
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch((err) => console.log(err));
  }
}
