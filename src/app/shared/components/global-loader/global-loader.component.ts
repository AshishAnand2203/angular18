import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { GlobalLoadingService } from '../../../core/services/global-loading.service';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoaderComponent {
  readonly loading = inject(GlobalLoadingService);
}