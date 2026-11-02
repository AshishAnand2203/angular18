import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './public-footer.component.html',
  styleUrl: './public-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicFooterComponent {
readonly currentYear = new Date().getFullYear();
}
