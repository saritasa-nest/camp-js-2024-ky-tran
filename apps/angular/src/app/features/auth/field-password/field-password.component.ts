import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';
import { createUniqueId } from '@js-camp/angular/core/utils/helpers/create-unique-id';
import { combineLatest, defer, map, startWith } from 'rxjs';
import { listenControlTouched } from '@js-camp/angular/core/utils/rxjs/listenControlTouched';
import { FORM_STATUS_INVALID } from '@js-camp/angular/shared/constants';

/** Field Password component. */
@Component({
	selector: 'camp-field-password',
	standalone: true,
	templateUrl: './field-password.component.html',
	styleUrl: '../auth.component.css',
	imports: [CommonModule, ReactiveFormsModule, MatIconModule, FieldErrorComponent],
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
	public control!: FormControl;

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	private readonly isTouched$ = defer(() => listenControlTouched(this.control));

	private readonly status$ = defer(() => this.control.statusChanges.pipe(startWith(FORM_STATUS_INVALID)));

	/** Weather the form field is invalid to display error message. */
	protected readonly isInvalid$ = defer(() => combineLatest([this.isTouched$, this.status$]).pipe(
		map(([isTouched, status]) => isTouched && status === FORM_STATUS_INVALID),
	));

	/** Unique id.*/
	protected readonly uniqueId = createUniqueId(this.field);

	/** Weather password is hidden.*/
	protected readonly isPasswordHidden = signal(true);

	/**
	 * On toggle password.
	 * @param event Mouse event.
	 */
	protected onTogglePassword(): void {
		this.isPasswordHidden.set(!this.isPasswordHidden());
	}
}
