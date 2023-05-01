import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../auth.service';
import { pb } from '../pocketbase';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
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
