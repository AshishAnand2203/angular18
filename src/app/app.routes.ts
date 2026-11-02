import { Routes } from '@angular/router';

export const routes: Routes = [
//   {
//     path: '',
//     title: 'Home | Team Work Portal',
//     loadComponent: () =>
//       import('./features/public/pages/landing/landing.component').then(
//         (m) => m.LandingComponent,
//       ),
//   },
//   {
//     path: 'about',
//     title: 'About Us | Team Work Portal',
//     loadComponent: () =>
//       import('./features/public/pages/about/about.component').then(
//         (m) => m.AboutComponent,
//       ),
//   },
//   {
//     path: 'services',
//     title: 'Services | Team Work Portal',
//     loadComponent: () =>
//       import('./features/public/pages/services/services.component').then(
//         (m) => m.ServicesComponent,
//       ),
//   },
//   {
//     path: 'contact',
//     title: 'Contact Us | Team Work Portal',
//     loadComponent: () =>
//       import('./features/public/pages/contact/contact.component').then(
//         (m) => m.ContactComponent,
//       ),
//   },
//   {
//     path: '**',
//     redirectTo: '',
//     pathMatch: 'full',
//   },

{
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component')
        .then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Home | Team Work Portal',
        loadComponent: () =>
          import('./features/public/pages/landing/landing.component')
            .then(m => m.LandingComponent)
      },
      {
        path: 'about',
        title: 'About Us | Team Work Portal',
        loadComponent: () =>
          import('./features/public/pages/about/about.component')
            .then(m => m.AboutComponent)
      },
      {
        path: 'services',
        title: 'Services | Team Work Portal',
        loadComponent: () =>
          import('./features/public/pages/services/services.component')
            .then(m => m.ServicesComponent)
      },
      {
        path: 'contact',
        title: 'Contact Us | Team Work Portal',
        loadComponent: () =>
          import('./features/public/pages/contact/contact.component')
            .then(m => m.ContactComponent)
      }
    ]
  },
  {
    path: 'workspace',
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout.component')
        .then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        title: 'Dashboard | Team Work Portal',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-home/dashboard-home.component')
            .then(m => m.DashboardHomeComponent)
      },
      {
        path: 'tasks',
        title: 'Work Items | Team Work Portal',
        loadComponent: () =>
          import('./features/work-items/pages/work-item-list/work-item-list.component')
            .then(m => m.WorkItemListComponent)
      },
      {
        path: 'teams',
        title: 'Teams | Team Work Portal',
        loadComponent: () =>
          import('./features/teams/pages/team-list/team-list.component')
            .then(m => m.TeamListComponent)
      }
    ]
  },
  {
    path: '**',
    title: 'Page Not Found | Team Work Portal',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  }
];
