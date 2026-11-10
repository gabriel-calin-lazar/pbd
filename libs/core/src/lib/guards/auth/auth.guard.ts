import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '@pbd/auth';
// import { CartStore } from '@pbd/cart-store';


export const authGuard: CanMatchFn = () => {
  const auth = inject(Auth);
  // const store = inject(CartStore);

  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/auth/login']);
};

export const guestGuard: CanMatchFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/']);
};
