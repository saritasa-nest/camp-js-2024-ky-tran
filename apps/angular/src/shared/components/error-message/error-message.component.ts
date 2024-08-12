import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Error message component. */
@Component({
	selector: 'camp-error-message',
	standalone: true,
	templateUrl: './error-message.component.html',
	styleUrl: './error-message.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
	/** Error message. */
	public readonly errorMessage = input('Some thing went wrong! Please try again.');
}
