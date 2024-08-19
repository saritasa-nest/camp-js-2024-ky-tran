import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DEFAULT_ERROR_MESSAGE } from '@js-camp/angular/shared/constants';

/** Field Error component. */
@Component({
	selector: 'camp-field-error',
	standalone: true,
	templateUrl: './field-error.component.html',
	styleUrl: '../auth.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorComponent {
	/** Error message. */
	@Input({ required: true })
	public errorMessage = DEFAULT_ERROR_MESSAGE;
}
