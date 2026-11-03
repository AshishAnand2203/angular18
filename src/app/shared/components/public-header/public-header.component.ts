
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicHeaderComponent {
  readonly auth = inject(AuthService);

  readonly menuOpen = signal(false);

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }
}
