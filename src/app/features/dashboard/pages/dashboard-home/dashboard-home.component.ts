import { ChangeDetectionStrategy, Component } from '@angular/core';

interface DashboardStat {
  label: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent {
readonly stats: DashboardStat[] = [
    {
      label: 'Total Tasks',
      value: 24,
      icon: 'bi-list-check',
      color: 'primary'
    },
    {
      label: 'Pending Review',
      value: 8,
      icon: 'bi-hourglass-split',
      color: 'warning'
    },
    {
      label: 'Completed',
      value: 12,
      icon: 'bi-check-circle',
      color: 'success'
    },
    {
      label: 'Active Teams',
      value: 6,
      icon: 'bi-people',
      color: 'info'
    }
  ];
}
