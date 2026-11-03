
import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';

import { Observable, tap } from 'rxjs';



import {
  AuthUser,
  LoginRequest,
  UserRole,
  dashboardPathForRole
} from '../models/auth.model';
import { DemoAuthGateway } from './demo-auth-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly gateway = inject(DemoAuthGateway);

  private readonly storageKey = 'twp-demo-session-v1';

  private readonly userState = signal<AuthUser | null>(
    this.restoreSession()
  );

  readonly currentUser = this.userState.asReadonly();

  readonly isAuthenticated = computed(
    () => this.currentUser() !== null
  );

  readonly currentRole = computed(
    () => this.currentUser()?.role ?? null
  );

  readonly dashboardPath = computed(() => {
    const user = this.currentUser();

    return user
      ? dashboardPathForRole(user.role)
      : '/login';
  });

  login(credentials: LoginRequest): Observable<AuthUser> {
    return this.gateway.login(credentials).pipe(
      tap(user => {
        this.userState.set(user);
        this.saveSession(user);
      })
    );
  }

  logout(): void {
    this.userState.set(null);

    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      console.warn('Unable to clear the demo session.');
    }
  }

  hasRole(role: UserRole): boolean {
    return this.currentRole() === role;
  }

  private saveSession(user: AuthUser): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(user)
      );
    } catch {
      console.warn('Unable to persist the demo session.');
    }
  }

  private restoreSession(): AuthUser | null {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (!saved) {
        return null;
      }

      const parsed: unknown = JSON.parse(saved);

      if (!this.isAuthUser(parsed)) {
        localStorage.removeItem(this.storageKey);
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  private isAuthUser(value: unknown): value is AuthUser {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const user = value as Record<string, unknown>;

    return (
      typeof user['id'] === 'number' &&
      Number.isSafeInteger(user['id']) &&
      user['id'] > 0 &&
      typeof user['name'] === 'string' &&
      typeof user['email'] === 'string' &&
      (
        user['role'] === 'employee' ||
        user['role'] === 'manager' ||
        user['role'] === 'admin'
      )
    );
  }
}
