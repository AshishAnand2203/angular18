import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent {
  readonly auth = inject(AuthService);
}