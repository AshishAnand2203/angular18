import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
readonly sidebarOpen = signal(false);

  readonly navigation: NavigationItem[] = [
    {
      label: 'Overview',
      path: '/workspace/dashboard',
      icon: 'bi-grid-1x2'
    },
    {
      label: 'Work Items',
      path: '/workspace/tasks',
      icon: 'bi-list-check'
    },
    {
      label: 'Teams',
      path: '/workspace/teams',
      icon: 'bi-people'
    }
  ];

  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
