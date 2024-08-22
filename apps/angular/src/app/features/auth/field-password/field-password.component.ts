import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
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

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	/** Weather password is hidden.*/
	protected readonly isPasswordHidden = signal(true);

	/** Unique id.*/
	protected readonly uniqueId = createUniqueId('field-password');

	/**
	 * On toggle password.
	 * @param event Mouse event.
	 */
	protected onTogglePassword(): void {
		this.isPasswordHidden.set(!this.isPasswordHidden());
	}

	/** Trigger change detection manually. */
	public detectChanges(): void {
		this.changeDetectorRef.detectChanges();
	}
}
