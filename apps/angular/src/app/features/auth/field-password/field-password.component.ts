import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SignInFormErrorService } from '@js-camp/angular/core/services/sign-in-form-error.service';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';

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
	/** Password control. */
	@Input({ required: true })
	public passwordControl = new FormControl();

	/** Loading status. */
	@Input()
	public set isLoading(isLoading: boolean) {
		if (isLoading) {
			this.passwordControl.disable();
		} else {
			this.passwordControl.enable();
		}
	}

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	/** Form error service. */
	protected readonly formErrorService = inject(SignInFormErrorService);

	/** Weather password is hidden.*/
	protected readonly isPasswordHidden = signal(true);

	/** Password error. */
	protected get passwordError(): string {
		const isInvalid = this.passwordControl.invalid && (this.passwordControl.dirty || this.passwordControl.touched);
		return isInvalid ? this.formErrorService.handleErrorMessage('password', this.passwordControl.errors) : '';
	}

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
