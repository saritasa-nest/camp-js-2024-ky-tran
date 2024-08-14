import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

/** Sign In component. */
@Component({
	selector: 'camp-sign-in',
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.css',
	imports: [RouterModule, MatIconModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Sign in form group. */
	protected readonly form = this.formBuilder.group({
		email: ['', [Validators.email, Validators.required]],
		password: ['', [Validators.required, Validators.minLength(8), this.validateNonNumericPassword]],
	});

	/** Hide password signal. */
	protected readonly hidePassword = signal(true);

	private validateNonNumericPassword(control: AbstractControl): ValidationErrors | null {
		if (!control.value) {
			return null;
		}

		const isNumeric = /^\d+$/.test(control.value);
		return isNumeric ? { numericPassword: true } : null;
	}

	/**
	 * Toggle hide password event.
	 * @param event Mouse event.
	 */
	protected onToggleHidePassword(): void {
		this.hidePassword.set(!this.hidePassword());
	}

	/** On submit. */
	protected onSubmit(): void {
		console.log('Is form valid -->', this.form.valid);
		console.log(this.form);
	}
}
