import { Routes } from '@angular/router';
import { AppRoutes } from './home/home.routes';

export const routes: Routes = [
  {
    path: AppRoutes.HOME,
    data: { breadcrumb: AppRoutes.HOME },
    loadChildren: () => import('./home/home.routes').then((mod) => mod.routes),
  },
  { path: '**', redirectTo: AppRoutes.HOME, pathMatch: 'full' },
];
