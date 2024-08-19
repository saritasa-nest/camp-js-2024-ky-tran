import { inject, Injectable } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { SignUpForm } from '@js-camp/angular/shared/types/auth-form';
import { AuthFormService } from '@js-camp/angular/core/services/auth-form.service';

/** Sign up form service. */
@Injectable({ providedIn: 'root' })
export class SignUpFormService extends AuthFormService {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Initialize sign up form. */
	public initialize(): SignUpForm {
		const nameInput = ['', [Validators.required]];
		const passwordInput = [
			'',
			[
				Validators.required,
				Validators.minLength(PASSWORD_MIN_LENGTH),
				super.validateNonNumericPassword,
			],
		];

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
}
