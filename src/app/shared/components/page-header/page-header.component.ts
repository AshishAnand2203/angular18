import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {

  readonly title = input.required<string>();
  readonly subtitle = input(' ');

  readonly actionLabel = input(' ');
  readonly actionIcon = input('bi-plus-lg');

  readonly action = output<void>();


  onActionClick():void {
    this.action.emit();
  }

}
