import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { baseUrlInterceptor } from '@pbd/web/app/core/interceptors/base-url.interceptor';
import { credentialsInterceptor } from '@pbd/web/app/core/interceptors/credentials.interceptor';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([baseUrlInterceptor, credentialsInterceptor])),
  ],
};
