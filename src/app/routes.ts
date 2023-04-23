import { Route } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'note',
    canActivate: [() => inject(AuthService).isLoggedIn()],
    loadComponent: () =>
      import('./note/note.component').then((m) => m.NoteComponent),
  },
  {
    path: 'home',
    canActivate: [() => inject(AuthService).isLoggedIn()],
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
