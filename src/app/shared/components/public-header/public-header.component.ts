import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicHeaderComponent {
readonly menuOpen = signal(false);

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }
}
