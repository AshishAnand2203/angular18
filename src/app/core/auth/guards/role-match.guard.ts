import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { getAllowedRoles } from './role.guard';

export const roleMatchGuard: CanMatchFn = route => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const allowedRoles = getAllowedRoles(route.data?.['roles']);
  const currentRole = auth.currentRole();

  if (
    currentRole !== null &&
    allowedRoles.includes(currentRole)
  ) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};