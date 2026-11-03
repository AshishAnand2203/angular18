import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { ToastService } from '../../../core/services/toast.service';
import { ToastType } from '../../../core/models/toast.model';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  readonly toast = inject(ToastService);

  icon(type: ToastType): string {
    switch (type) {
      case 'success': return 'bi-check-circle-fill';
      case 'error': return 'bi-exclamation-circle-fill';
      case 'warning': return 'bi-exclamation-triangle-fill';
      case 'info': return 'bi-info-circle-fill';
    }
  }
}