import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';


interface PortalService {
  id: number;
  title: string;
  description: string;
  icon: string;
}


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
 readonly services: PortalService[] = [
    {
      id: 1,
      title: 'Employee Management',
      description:
        'Manage employee profiles, assignments and team information.',
      icon: '👥'
    },
    {
      id: 2,
      title: 'Task Management',
      description:
        'Create, assign, track and manage tasks throughout their lifecycle.',
      icon: '📋'
    },
    {
      id: 3,
      title: 'Role-Based Dashboards',
      description:
        'Provide dedicated dashboards for employees, managers and admins.',
      icon: '📊'
    },
    {
      id: 4,
      title: 'Approval Workflow',
      description:
        'Allow managers to review, approve or reject submitted work.',
      icon: '✅'
    },
    {
      id: 5,
      title: 'Activity Tracking',
      description:
        'Maintain a record of important actions and workflow changes.',
      icon: '📈'
    },
    {
      id: 6,
      title: 'Profile Management',
      description:
        'Update personal details and upload profile pictures.',
      icon: '🪪'
    }
  ];
}
