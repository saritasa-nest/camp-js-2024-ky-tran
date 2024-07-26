import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '@js-camp/angular/app/features/components/main-layout/main-layout.component';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	standalone: true,
	imports: [MainLayoutComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
