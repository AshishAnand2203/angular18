
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { defer, finalize } from 'rxjs';

import { GlobalLoadingService } from '../services/global-loading.service';
import { SKIP_GLOBAL_LOADING } from './http-context.tokens';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(GlobalLoadingService);

  if (req.context.get(SKIP_GLOBAL_LOADING)) {
    return next(req);
  }

  return defer(() => {
    loading.start();

    return next(req).pipe(
      finalize(() => loading.stop())
    );
  });
};
