import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


export type BadgeVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'secondary';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBadgeComponent {

   @Input({ required: true }) label = '';

  @Input() variant: BadgeVariant = 'secondary';

}
