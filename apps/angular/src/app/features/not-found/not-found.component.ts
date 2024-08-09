import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Not Found component. */
@Component({
	selector: 'camp-not-found',
	standalone: true,
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
