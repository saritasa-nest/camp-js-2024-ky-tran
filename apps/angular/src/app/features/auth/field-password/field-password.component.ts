import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';
import { createUniqueId } from '@js-camp/angular/core/utils/helpers/create-unique-id';

/** Field Password component. */
@Component({
	selector: 'camp-field-password',
	standalone: true,
	templateUrl: './field-password.component.html',
	styleUrl: '../auth.component.css',
	imports: [ReactiveFormsModule, MatIconModule, FieldErrorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldPasswordComponent {
	/** Label. */
	@Input()
	public label = 'Password';

	/** Field. */
	@Input()
	public field = 'password';

	/** Password control. */
	@Input({ required: true })
	public control = new FormControl();

	/** Touched. */
	@Input({ required: true })
	public touched = false;

	/** Loading status. */
	@Input({ required: true })
	public isLoading = false;

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	/** Weather password is hidden.*/
	protected readonly isPasswordHidden = signal(true);

	/** Unique id.*/
	protected readonly uniqueId = createUniqueId('field-password');

	/** Password error. */
	protected get passwordError(): string {
		const isInvalid = this.control.invalid && (this.control.dirty || this.control.touched);
		return isInvalid ? this.formErrorService.handleErrorMessage(this.field, this.control.errors) : '';
	}

	/**
	 * On toggle password.
	 * @param event Mouse event.
	 */
	protected onTogglePassword(): void {
		this.isPasswordHidden.set(!this.isPasswordHidden());
	}
}
