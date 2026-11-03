
import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { DEMO_ACCOUNTS } from '../data/demo-users';

import {
  AuthError,
  AuthUser,
  LoginRequest
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class DemoAuthGateway {

  login(credentials: LoginRequest): Observable<AuthUser> {
    const email = credentials.email.trim().toLowerCase();

    return timer(300).pipe(
      mergeMap(() => {
        const account = DEMO_ACCOUNTS.find(
          item =>
            item.user.email === email &&
            item.password === credentials.password
        );

        if (!account) {
          return throwError(
            () => new AuthError('Invalid email address or password.')
          );
        }

        return of({ ...account.user });
      })
    );
  }
}
