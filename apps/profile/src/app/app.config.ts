import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { API_BASE_URL, baseUrlInterceptor, credentialsInterceptor } from '@pbd/core';
import { environment } from '../environments/environment';
import routes from '../app/features/profile/profile.routes';
import { Auth } from '@pbd/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    provideHttpClient(withInterceptors([baseUrlInterceptor, credentialsInterceptor])),
    provideAppInitializer(() => inject(Auth).init()),
  ],
};
