import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Auth } from '@pbd/auth';

export const profileRoutes: Routes = [
  {
    path: '',
    resolve: {
      profileUser: () => inject(Auth).init(),
    },
    loadComponent: () => import('./pages/profile-page/profile-page').then((m) => m.ProfilePage),
    title: 'My Profile',
  },
];
