import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Main Layout component. */
@Component({
	selector: 'camp-main-layout',
	standalone: true,
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.css',
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
