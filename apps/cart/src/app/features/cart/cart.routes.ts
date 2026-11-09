import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/cart-page/cart-page').then((module) => module.CartPage),
    title: 'Cart',
  },
];

export default routes;
