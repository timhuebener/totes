import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, NgIf],
  template: `
    <app-navbar></app-navbar>
    <div class="content"><router-outlet></router-outlet></div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
