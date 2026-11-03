
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import {
  defer,
  of,
  throwError,
  Observable,
  delay
} from 'rxjs';

import {
  MockDatabaseError,
  MockWorkItemsDatabase
} from '../data/mock-work-items.database';

//const database = new MockWorkItemsDatabase();

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const path = new URL(req.url, document.baseURI).pathname;
  const match = /^\/api\/work-items(?:\/(\d+))?$/.exec(path);

  if (!match) {
    return next(req);
  }

  return defer(() => {
    try {
        const database = new MockWorkItemsDatabase();
      const id = match[1] ? Number(match[1]) : null;

      if (id !== null && !Number.isSafeInteger(id)) {
        return methodNotAllowed(req);
      }

      if (req.method === 'GET' && id === null) {
        return success(req, 200, database.getAll());
      }

      if (req.method === 'GET' && id !== null) {
        return success(req, 200, database.getById(id));
      }

      if (req.method === 'POST' && id === null) {
        return success(req, 201, database.create(req.body));
      }

      if (req.method === 'PUT' && id !== null) {
        return success(req, 200, database.update(id, req.body));
      }

      if (req.method === 'DELETE' && id !== null) {
        database.delete(id);
        return success(req, 204, null);
      }

      return methodNotAllowed(req);

    } catch (error: unknown) {
      if (error instanceof MockDatabaseError) {
        return throwError(() => new HttpErrorResponse({
          status: error.status,
          statusText: error.status === 404 ? 'Not Found' : 'Bad Request',
          url: req.url,
          error: {
            code: error.code,
            message: error.message
          }
        }));
      }

      return throwError(() => new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        url: req.url,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred.'
        }
      }));
    }
  });
};

function success(
  req: HttpRequest<unknown>,
  status: number,
  body: unknown
): Observable<HttpResponse<unknown>> {
  return of(new HttpResponse({
    status,
    url: req.url,
    body
  })).pipe(delay(200));
}

function methodNotAllowed(
  req: HttpRequest<unknown>
): Observable<never> {
  return throwError(() => new HttpErrorResponse({
    status: 405,
    statusText: 'Method Not Allowed',
    url: req.url,
    error: {
      code: 'METHOD_NOT_ALLOWED',
      message: 'This HTTP method is not supported.'
    }
  }));
}
