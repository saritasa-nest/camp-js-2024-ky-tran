import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
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
	/** Field. */
	@Input()
	public field = '';

	/** Field. */
	@Input()
	public errors: ValidationErrors | null = null;

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	/** Password error. */
	protected get errorMessage(): string {
		return this.formErrorService.handleErrorMessage(this.field, this.errors) ?? DEFAULT_ERROR_MESSAGE;
	}
}
