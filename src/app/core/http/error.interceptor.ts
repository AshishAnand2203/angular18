
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { ApiErrorService } from '../services/api-error.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../auth/services/auth.service';
import { SKIP_GLOBAL_ERROR_TOAST } from './http-context.tokens';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const apiErrors = inject(ApiErrorService);
  const toast = inject(ToastService);
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      const normalized = apiErrors.normalize(error);
      const skipToast = req.context.get(SKIP_GLOBAL_ERROR_TOAST);

      if (!skipToast) {
        toast.error(normalized.message);
      }

      if (error.status === 401 && auth.isAuthenticated()) {
        auth.logout();

        if (!router.url.startsWith('/login')) {
          void router.navigate(['/login'], {
            queryParams: { sessionExpired: '1' },
            replaceUrl: true
          });
        }
      }

      if (error.status === 403 && auth.isAuthenticated()) {
        if (!router.url.startsWith('/unauthorized')) {
          void router.navigateByUrl('/unauthorized');
        }
      }

      return throwError(() => error);
    })
  );
};
