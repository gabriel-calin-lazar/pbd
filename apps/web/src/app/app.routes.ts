import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { authGuard, guestGuard } from '@pbd/core';
import { Auth } from '@pbd/auth';
import { cartNotEmptyGuard } from './features/checkout/guards/cart-not-empty.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: (): string => {
      return inject(Auth).isAdmin() ? '/pizzerias/admin' : '/pizzerias';
    },
  },
  {
    path: 'pizzerias',
    loadChildren: () =>
      import('./features/pizzerias/pizzeria.routes').then((m) => m.pizzeriasRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [guestGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.routes').then((m) => m.cartRoutes),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.routes').then((m) => m.checkoutRoutes),
    canMatch: [authGuard, cartNotEmptyGuard],
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/order.routes').then((m) => m.ordersRoutes),
    canMatch: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () => loadRemoteModule('profile', './Routes'),
    canMatch: [authGuard],
  },
  // {
  //   path: 'profile-old',
  //   loadChildren: () => import('../../../profile/src/app/features/profile/profile.routes'),
  //   canMatch: [authGuard],
  // },
  {
    path: 'unauthorized',
    loadChildren: () =>
      import('./features/unauthorized/unauthorized.routes').then((m) => m.unauthorizedRoutes),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.routes').then((m) => m.notFoundRoutes),
  },
];
