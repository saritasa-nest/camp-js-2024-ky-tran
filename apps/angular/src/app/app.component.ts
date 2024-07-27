import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '@js-camp/angular/shared/components/main-layout/main-layout.component';

/** App component. */
@Component({
	selector: 'camp-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	imports: [MainLayoutComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
