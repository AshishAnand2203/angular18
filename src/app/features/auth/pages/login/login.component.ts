
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/services/auth.service';
import { AuthError } from '../../../../core/auth/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly showPassword = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });



  submit(): void {
    if (this.loading()) {
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.loading.set(true);

    this.auth.login(this.loginForm.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: user => {
          this.loginForm.controls.password.reset();

          void this.router.navigateByUrl(
            this.auth.dashboardPath(),
            { replaceUrl: true }
          );
        },
        error: (error: unknown) => {
          this.errorMessage.set(
            error instanceof AuthError
              ? error.message
              : 'Unable to sign in. Please try again.'
          );
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }
}
