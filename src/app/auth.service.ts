import { Injectable } from '@angular/core';
import { pb } from './pocketbase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(readonly router: Router) {}

  public isLoggedIn() {
    const isLoggedIn = pb.authStore.isValid;
    console.log('is logged in: ', isLoggedIn);

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }

    return isLoggedIn;
  }

  public async login(username: string, password: string) {
    return await pb.collection('users').authWithPassword(username, password);
  }

  public logout() {
    return pb.authStore.clear();
  }

  public async register(
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    const data = {
      username,
      email,
      password,
      passwordConfirm,
    };

    return await pb.collection('users').create(data);
  }
}
