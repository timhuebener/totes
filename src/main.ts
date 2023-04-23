import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(APP_ROUTES)],
});
