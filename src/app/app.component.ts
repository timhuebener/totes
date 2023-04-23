import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <h1>Totes</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(readonly auth: AuthService, readonly router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
