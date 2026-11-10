import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { baseUrlInterceptor, credentialsInterceptor } from '@pbd/core';
import { API_BASE_URL } from '@pbd/tokens';
import { Auth } from '@pbd/auth';
import { CartStore, HEADER_CART } from '@pbd/cart-store';
import { environment } from '../environments/environment';
import routes from './features/cart/cart.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    CartStore,
    { provide: HEADER_CART, useExisting: CartStore },
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    provideHttpClient(withInterceptors([baseUrlInterceptor, credentialsInterceptor])),
    provideAppInitializer(() => inject(Auth).init()),
  ],
};
