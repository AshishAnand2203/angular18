import { ChangeDetectionStrategy, Component } from '@angular/core';

interface WorkItem {
  id: number;
  title: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-work-item-list',
  standalone: true,
  imports: [],
  templateUrl: './work-item-list.component.html',
  styleUrl: './work-item-list.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WorkItemListComponent {
 readonly workItems: WorkItem[] = [
    {
      id: 101,
      title: 'Review onboarding documents',
      assignedTo: 'Alex Johnson',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 102,
      title: 'Update employee records',
      assignedTo: 'Sarah Wilson',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 103,
      title: 'Prepare weekly report',
      assignedTo: 'Michael Brown',
      priority: 'Low',
      status: 'Completed'
    }
  ];
}
