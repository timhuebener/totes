import { Injectable } from '@angular/core';
import { pb } from './pocketbase';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authStatus = signal(pb.authStore.isValid);

  constructor(readonly router: Router) {}

  public isLoggedIn() {
    const isLoggedIn = this.authStatus();
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }

    return isLoggedIn;
  }

  public async login(username: string, password: string) {
    return await pb.collection('users').authWithPassword(username, password);
  }

  public logout() {
    pb.authStore.clear();
    this.authStatus.set(false);
    this.router.navigate(['/login']);
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
