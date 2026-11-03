
// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () =>
//       import('./layouts/public-layout/public-layout.component')
//         .then(m => m.PublicLayoutComponent),
//     children: [
//       {
//         path: '',
//         pathMatch: 'full',
//         title: 'Home | Team Work Portal',
//         loadComponent: () =>
//           import('./features/public/pages/landing/landing.component')
//             .then(m => m.LandingComponent)
//       },
//       {
//         path: 'about',
//         title: 'About Us | Team Work Portal',
//         loadComponent: () =>
//           import('./features/public/pages/about/about.component')
//             .then(m => m.AboutComponent)
//       },
//       {
//         path: 'services',
//         title: 'Services | Team Work Portal',
//         loadComponent: () =>
//           import('./features/public/pages/services/services.component')
//             .then(m => m.ServicesComponent)
//       },
//       {
//         path: 'contact',
//         title: 'Contact Us | Team Work Portal',
//         loadComponent: () =>
//           import('./features/public/pages/contact/contact.component')
//             .then(m => m.ContactComponent)
//       }
//     ]
//   },
//   {
//     path: 'login',
//     title: 'Sign In | Team Work Portal',
//     loadComponent: () =>
//       import('./features/auth/pages/login/login.component')
//         .then(m => m.LoginComponent)
//   },
//   {
//     path: 'workspace',
//     loadComponent: () =>
//       import('./layouts/dashboard-layout/dashboard-layout.component')
//         .then(m => m.DashboardLayoutComponent),
//     children: [
//       {
//         path: '',
//         pathMatch: 'full',
//         redirectTo: 'dashboard'
//       },
//       {
//         path: 'dashboard',
//         title: 'Dashboard | Team Work Portal',
//         loadComponent: () =>
//           import('./features/dashboard/pages/dashboard-home/dashboard-home.component')
//             .then(m => m.DashboardHomeComponent)
//       },
//       {
//         path: 'employee',
//         title: 'Employee Dashboard | Team Work Portal',
//         data: { role: 'employee' },
//         loadComponent: () =>
//           import('./features/dashboard/pages/role-dashboard/role-dashboard.component')
//             .then(m => m.RoleDashboardComponent)
//       },
//       {
//         path: 'manager',
//         title: 'Manager Dashboard | Team Work Portal',
//         data: { role: 'manager' },
//         loadComponent: () =>
//           import('./features/dashboard/pages/role-dashboard/role-dashboard.component')
//             .then(m => m.RoleDashboardComponent)
//       },
//       {
//         path: 'admin',
//         title: 'Admin Dashboard | Team Work Portal',
//         data: { role: 'admin' },
//         loadComponent: () =>
//           import('./features/dashboard/pages/role-dashboard/role-dashboard.component')
//             .then(m => m.RoleDashboardComponent)
//       },
//       {
//         path: 'tasks',
//         title: 'Work Items | Team Work Portal',
//         loadComponent: () =>
//           import('./features/work-items/pages/work-item-list/work-item-list.component')
//             .then(m => m.WorkItemListComponent)
//       },
//       {
//         path: 'teams',
//         title: 'Teams | Team Work Portal',
//         loadComponent: () =>
//           import('./features/teams/pages/team-list/team-list.component')
//             .then(m => m.TeamListComponent)
//       }
//     ]
//   },
//   {
//     path: '**',
//     title: 'Page Not Found | Team Work Portal',
//     loadComponent: () =>
//       import('./shared/components/not-found/not-found.component')
//         .then(m => m.NotFoundComponent)
//   }
// ];



import { Routes } from '@angular/router';

import { authGuard } from './core/auth/guards/auth.guard';
import { guestGuard } from './core/auth/guards/guest.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { roleMatchGuard } from './core/auth/guards/role-match.guard';
import { dashboardRedirectGuard } from './core/auth/guards/dashboard-redirect.guard';

export const routes: Routes = [
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
    path: 'login',
    title: 'Sign In | Team Work Portal',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'unauthorized',
    title: 'Access Denied | Team Work Portal',
    loadComponent: () =>
      import('./features/auth/pages/unauthorized/unauthorized.component')
        .then(m => m.UnauthorizedComponent)
  },

  {
    path: 'workspace',
    canActivate: [authGuard],
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
        canActivate: [dashboardRedirectGuard],
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-home/dashboard-home.component')
            .then(m => m.DashboardHomeComponent)
      },
      {
        path: 'employee',
        title: 'Employee Dashboard | Team Work Portal',
        data: {
          role: 'employee',
          roles: ['employee']
        },
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/dashboard/pages/role-dashboard/role-dashboard.component')
            .then(m => m.RoleDashboardComponent)
      },
      {
        path: 'manager',
        title: 'Manager Dashboard | Team Work Portal',
        data: {
          role: 'manager',
          roles: ['manager']
        },
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/dashboard/pages/role-dashboard/role-dashboard.component')
            .then(m => m.RoleDashboardComponent)
      },
      {
        path: 'admin',
        title: 'Admin Dashboard | Team Work Portal',
        data: {
          role: 'admin',
          roles: ['admin']
        },
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/dashboard/pages/role-dashboard/role-dashboard.component')
            .then(m => m.RoleDashboardComponent)
      },
      {
        path: 'tasks',
        title: 'Work Items | Team Work Portal',
        data: {
          roles: ['employee', 'manager', 'admin']
        },
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/work-items/pages/work-item-list/work-item-list.component')
            .then(m => m.WorkItemListComponent)
      },
      {
        path: 'teams',
        title: 'Teams | Team Work Portal',
        data: {
          roles: ['manager', 'admin']
        },
        canMatch: [roleMatchGuard],
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
