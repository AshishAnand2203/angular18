import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';

import { UserRole } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

const validRoles: UserRole[] = [
  'employee',
  'manager',
  'admin'
];

export function isUserRole(value: unknown): value is UserRole {
  return validRoles.some(role => role === value);
}

export function getAllowedRoles(value: unknown): UserRole[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isUserRole);
}

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const allowedRoles = getAllowedRoles(route.data['roles']);
  const currentRole = auth.currentRole();

  if (
    currentRole !== null &&
    allowedRoles.includes(currentRole)
  ) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};