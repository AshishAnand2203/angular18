
import { Injectable, OnDestroy, computed, signal } from '@angular/core';

import { ToastMessage, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnDestroy {
  private nextId = 1;

  private readonly toastState = signal<ToastMessage[]>([]);
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

  readonly toasts = this.toastState.asReadonly();
  readonly count = computed(() => this.toasts().length);

  success(message: string, title = 'Success'): number {
    return this.show('success', title, message);
  }

  error(message: string, title = 'Request failed'): number {
    return this.show('error', title, message, 8000);
  }

  warning(message: string, title = 'Warning'): number {
    return this.show('warning', title, message);
  }

  info(message: string, title = 'Information'): number {
    return this.show('info', title, message);
  }

  show(
    type: ToastType,
    title: string,
    message: string,
    duration = 6000
  ): number {
    const id = this.nextId++;

    const toast: ToastMessage = {
      id,
      type,
      title,
      message,
      duration
    };

    this.toastState.update(items => [...items, toast]);

    if (duration > 0) {
      const timer = setTimeout(() => this.dismiss(id), duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);

    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    this.toastState.update(items =>
      items.filter(item => item.id !== id)
    );
  }

  clear(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }

    this.timers.clear();
    this.toastState.set([]);
  }

  ngOnDestroy(): void {
    this.clear();
  }
}
