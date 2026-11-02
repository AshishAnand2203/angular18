import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Team {
  id: number;
  name: string;
  manager: string;
  memberCount: number;
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TeamListComponent {
readonly teams: Team[] = [
    {
      id: 1,
      name: 'Development',
      manager: 'Sarah Wilson',
      memberCount: 8
    },
    {
      id: 2,
      name: 'Design',
      manager: 'Alex Johnson',
      memberCount: 5
    },
    {
      id: 3,
      name: 'Operations',
      manager: 'Michael Brown',
      memberCount: 6
    }
  ];
}
