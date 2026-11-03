import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoadingService {
  private readonly pendingState = signal(0);

  readonly pendingRequests = this.pendingState.asReadonly();
  readonly isLoading = computed(() => this.pendingRequests() > 0);

  start(): void {
    this.pendingState.update(count => count + 1);
  }

  stop(): void {
    this.pendingState.update(count => Math.max(0, count - 1));
  }
}