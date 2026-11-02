import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home | Team Work Portal',
    loadComponent: () =>
      import('./features/public/pages/landing/landing.component').then(
        (m) => m.LandingComponent,
      ),
  },
  {
    path: 'about',
    title: 'About Us | Team Work Portal',
    loadComponent: () =>
      import('./features/public/pages/about/about.component').then(
        (m) => m.AboutComponent,
      ),
  },
  {
    path: 'services',
    title: 'Services | Team Work Portal',
    loadComponent: () =>
      import('./features/public/pages/services/services.component').then(
        (m) => m.ServicesComponent,
      ),
  },
  {
    path: 'contact',
    title: 'Contact Us | Team Work Portal',
    loadComponent: () =>
      import('./features/public/pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
