
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ApiError,
  ApiErrorResponse
} from '../models/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {
  normalize(error: HttpErrorResponse): ApiError {
    const body = this.getErrorBody(error);

    switch (error.status) {
      case 0:
        return {
          status: 0,
          code: 'NETWORK_ERROR',
          message: 'Unable to connect to the server. Check your connection.'
        };

      case 400:
        return {
          status: 400,
          code: body?.code ?? 'BAD_REQUEST',
          message: body?.message ?? 'The request contains invalid information.'
        };

      case 401:
        return {
          status: 401,
          code: 'UNAUTHORIZED',
          message: 'Your session is invalid or has expired. Please sign in again.'
        };

      case 403:
        return {
          status: 403,
          code: 'FORBIDDEN',
          message: 'You do not have permission to perform this action.'
        };

      case 404:
        return {
          status: 404,
          code: 'NOT_FOUND',
          message: 'The requested resource could not be found.'
        };

      case 409:
        return {
          status: 409,
          code: body?.code ?? 'CONFLICT',
          message: body?.message ?? 'This operation conflicts with existing data.'
        };

      case 422:
        return {
          status: 422,
          code: body?.code ?? 'VALIDATION_ERROR',
          message: body?.message ?? 'Please check the information provided.'
        };

      default:
        if (error.status >= 500) {
          return {
            status: error.status,
            code: 'SERVER_ERROR',
            message: 'Something went wrong on the server. Please try again later.'
          };
        }

        return {
          status: error.status,
          code: body?.code ?? 'REQUEST_ERROR',
          message: 'The request could not be completed.'
        };
    }
  }

  private getErrorBody(error: HttpErrorResponse): ApiErrorResponse | null {
    const value: unknown = error.error;

    if (typeof value !== 'object' || value === null) {
      return null;
    }

    const data = value as Record<string, unknown>;

    return {
      code: typeof data['code'] === 'string'
        ? data['code']
        : undefined,

      message: typeof data['message'] === 'string'
        ? data['message']
        : undefined
    };
  }
}
