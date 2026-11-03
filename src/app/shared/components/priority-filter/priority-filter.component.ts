import { ChangeDetectionStrategy, Component, model } from '@angular/core';

export type PriorityFilter =
  | 'All'
  | 'Low'
  | 'Medium'
  | 'High';

@Component({
  selector: 'app-priority-filter',
  standalone: true,
  imports: [],
  templateUrl: './priority-filter.component.html',
  styleUrl: './priority-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriorityFilterComponent {

  readonly value = model<PriorityFilter>('All');

  readonly options: PriorityFilter[] = [
    'All',
    'Low',
    'Medium',
    'High'
  ];

  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.value.set(select.value as PriorityFilter);
  }
}
