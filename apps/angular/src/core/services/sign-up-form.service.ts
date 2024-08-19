import { inject, Injectable } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { SignUpForm } from '@js-camp/angular/shared/types/auth-form';

/** Sign up form service. */
@Injectable({ providedIn: 'root' })
export class SignUpFormService {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Initialize sign up form. */
	public initialize(): SignUpForm {
		const nameInput = ['', [Validators.required]];
		const passwordInput = ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), this.validateNonNumericPassword]];

		return this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			name: this.formBuilder.group({ firstName: nameInput, lastName: nameInput }),
			passwords: this.formBuilder.group(
				{ password: passwordInput, passwordConfirm: passwordInput },
				{ validators: this.passwordsMatchValidator('password', 'passwordConfirm') },
			),
		});
	}

	private passwordsMatchValidator(passwordField: string, passwordConfirmField: string): ValidatorFn {
		return (form: AbstractControl): ValidationErrors | null => {
			const password = form.get(passwordField)?.value;
			const passwordConfirm = form.get(passwordConfirmField)?.value;
			return password === passwordConfirm ? null : { passwordsMismatch: true };
		};
	}

	private validateNonNumericPassword(control: AbstractControl): ValidationErrors | null {
		if (control.value) {
			const isNumeric = /^\d+$/.test(control.value);
			return isNumeric ? { numericPassword: true } : null;
		}

		return null;
	}
}
