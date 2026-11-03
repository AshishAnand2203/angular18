
export type UserRole = 'employee' | 'manager' | 'admin';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface DemoAccount {
  user: AuthUser;
  password: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export function dashboardPathForRole(role: UserRole): string {
  switch (role) {
    case 'employee':
      return '/workspace/employee';

    case 'manager':
      return '/workspace/manager';

    case 'admin':
      return '/workspace/admin';
  }
}
