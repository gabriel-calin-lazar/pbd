import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withAutoCleanupInjectors,
  withInMemoryScrolling,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { baseUrlInterceptor, credentialsInterceptor } from '@pbd/core';
import { API_BASE_URL } from '@pbd/tokens';
import { CartStore, HEADER_CART } from '@pbd/cart-store';
import { Auth } from '@pbd/auth';
import { environment } from '../environments/environment';
import { GlobalErrorHandler } from './core/error-handler/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding({ unmatchedInputBehavior: 'undefinedIfStale' }),
      withAutoCleanupInjectors(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    CartStore,
    { provide: HEADER_CART, useExisting: CartStore },
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    provideHttpClient(withInterceptors([baseUrlInterceptor, credentialsInterceptor])),
    provideAppInitializer(() => inject(Auth).init()),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
