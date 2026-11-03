
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserRole } from '../../../../core/auth/models/auth.model';

interface DashboardFeature {
  title: string;
  description: string;
  icon: string;
  path: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-role-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './role-dashboard.component.html',
  styleUrl: './role-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDashboardComponent {
  private readonly route = inject(ActivatedRoute);

  readonly auth = inject(AuthService);

  readonly pageRole = this.route.snapshot.data['role'] as UserRole;

  readonly roleTitle = this.getRoleTitle(this.pageRole);

  private readonly allFeatures: DashboardFeature[] = [
    {
      title: 'Work Items',
      description: 'View tasks and work progress.',
      icon: 'bi-list-check',
      path: '/workspace/tasks',
      roles: ['employee', 'manager', 'admin']
    },
    {
      title: 'Teams',
      description: 'Explore team information.',
      icon: 'bi-people',
      path: '/workspace/teams',
      roles: ['manager', 'admin']
    }
  ];

  readonly features = computed(() => {
    const role = this.auth.currentRole();

    if (!role) {
      return [];
    }

    return this.allFeatures.filter(feature =>
      feature.roles.includes(role)
    );
  });

  readonly welcomeMessage = computed(() => {
    const user = this.auth.currentUser();

    return user
      ? `Welcome back, ${user.name}`
      : `Welcome to the ${this.roleTitle}`;
  });

  private getRoleTitle(role: UserRole): string {
    switch (role) {
      case 'employee':
        return 'Employee Dashboard';

      case 'manager':
        return 'Manager Dashboard';

      case 'admin':
        return 'Admin Dashboard';
    }
  }
}
