
import { ApplicationConfig } from '@angular/core';

import {
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { routes } from './app.routes';

import { loadingInterceptor } from './core/http/loading.interceptor';
import { errorInterceptor } from './core/http/error.interceptor';
import { mockApiInterceptor } from './mock/http/mock-api.interceptor';

import { API_CONFIG } from './core/config/api.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),

    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        errorInterceptor,
        ...(API_CONFIG.useMockApi ? [mockApiInterceptor] : [])
      ])
    )
  ]
};
