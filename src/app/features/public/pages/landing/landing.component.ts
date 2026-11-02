import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface PortalRole {
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ RouterLink,
    RouterLinkActive],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  readonly appName = 'Team Work Portal';
  readonly heading = 'Manage work. Empower teams';

  readonly description =
    'A modern employee and task management platform ' +
    'for employees, managers and administors.';

  readonly roles: PortalRole[] = [
    {
      name: 'Employee',
      description: 'View and manage assigned task.',
      icon: 'user',
    },
    {
      name: 'Manager',
      description: 'Coordinate teams and approve work.',
      icon: 'users',
    },
    {
      name: 'Administrator',
      description: 'Manage employees and monitor activities.',
      icon: 'shield',
    },

    {
      name: 'Guest',
      description: 'View landing page',
      icon: 'user',
    },
  ];

  readonly currentYear = new Date().getFullYear();
}
