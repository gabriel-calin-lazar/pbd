import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/profile-page/profile-page').then((m) => m.ProfilePage),
    title: 'My Profile',
  },
];

export default routes;
