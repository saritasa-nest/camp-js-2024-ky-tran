import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Error Message component. */
@Component({
	selector: 'camp-error-message',
	standalone: true,
	templateUrl: './error-message.component.html',
	styleUrl: './error-message.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
	/** Error message. */
	public readonly errorMessage = input<string>('Some thing went wrong! Please try again.');
}
