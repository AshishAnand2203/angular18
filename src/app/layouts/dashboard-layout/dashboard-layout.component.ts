
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { AuthService } from '../../core/auth/services/auth.service';
import { UserRole } from '../../core/auth/models/auth.model';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly sidebarOpen = signal(false);

  readonly navigation: NavigationItem[] = [
    {
      label: 'Work Items',
      path: '/workspace/tasks',
      icon: 'bi-list-check',
      roles: ['employee', 'manager', 'admin']
    },
    {
      label: 'Teams',
      path: '/workspace/teams',
      icon: 'bi-people',
      roles: ['manager', 'admin']
    }
  ];

  readonly visibleNavigation = computed(() => {
    const role = this.auth.currentRole();

    if (!role) {
      return [];
    }

    return this.navigation.filter(item =>
      item.roles.includes(role)
    );
  });

  readonly userInitials = computed(() => {
    const name = this.auth.currentUser()?.name;

    if (!name) {
      return 'GU';
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  });

  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.closeSidebar();

    void this.router.navigateByUrl('/login', {
      replaceUrl: true
    });
  }
}
