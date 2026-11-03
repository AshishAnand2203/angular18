import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastContainerComponent,
    GlobalLoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  
}
