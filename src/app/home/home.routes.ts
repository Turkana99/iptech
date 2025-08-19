import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export enum AppRoutes {
  HOME = 'home',
  ABOUT_US = 'about',
  CONTACT_US = 'contact',
  PRODUCTS = 'product',
  SERVICES = 'service',
}

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/main/component.routes').then((c) => c.routes),
      },
      {
        path: AppRoutes.ABOUT_US,
        loadChildren: () =>
          import('./components/about/component.routes').then((c) => c.routes),
      },
      {
        path: AppRoutes.CONTACT_US,
        loadChildren: () =>
          import('./components/contact-us/component.routes').then(
            (c) => c.routes
          ),
      },
      {
        path: AppRoutes.PRODUCTS,
        loadChildren: () =>
          import('./components/products/component.routes').then(
            (c) => c.routes
          ),
      },
      {
        path: AppRoutes.SERVICES,
        loadChildren: () =>
          import('./components/services/component.routes').then(
            (c) => c.routes
          ),
      },
    ],
  },
];
