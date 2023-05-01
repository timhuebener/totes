import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { pb } from '../pocketbase';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(readonly auth: AuthService, readonly router: Router) {}

  public isLoggedIn = pb.authStore.isValid;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
