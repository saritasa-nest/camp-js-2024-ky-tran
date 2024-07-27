import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Progress Spinner component. */
@Component({
	selector: 'camp-progress-spinner',
	standalone: true,
	templateUrl: './progress-spinner.component.html',
	styleUrl: './progress-spinner.component.css',
	imports: [CommonModule, MatProgressSpinnerModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerComponent {
	/** Running mode of progress spinner. */
	protected readonly mode: ProgressSpinnerMode = 'indeterminate';

	/** Length of the progress bar. */
	protected readonly value = 50;
}
