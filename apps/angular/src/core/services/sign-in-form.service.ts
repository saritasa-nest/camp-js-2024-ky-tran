import { inject, Injectable } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AppConfig } from '@js-camp/angular/config/app.config';
import { PASSWORD_MIN_LENGTH, SIGN_IN_EMAIL_DEV, SIGN_IN_PASSWORD_DEV } from '@js-camp/angular/shared/constants';
import { SignInForm } from '@js-camp/angular/shared/types/auth-form';

/** Sign in form service. */
@Injectable({ providedIn: 'root' })
export class SignInFormService {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly appConfig = inject(AppConfig);

	/** Initialize sign in form. */
	public initialize(): SignInForm {
		return this.formBuilder.group({
			email: [
				this.appConfig.isProduction ? '' : SIGN_IN_EMAIL_DEV,
				[Validators.email, Validators.required],
			],
			password: [
				this.appConfig.isProduction ? '' : SIGN_IN_PASSWORD_DEV,
				[Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), this.validateNonNumericPassword],
			],
		});
	}

	private validateNonNumericPassword(control: AbstractControl): ValidationErrors | null {
		if (control.value) {
			const isNumeric = /^\d+$/.test(control.value);
			return isNumeric ? { numericPassword: true } : null;
		}

		return null;
	}
}
