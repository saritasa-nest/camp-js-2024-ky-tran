import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { SignInForm } from '@js-camp/angular/shared/types/auth-form';
import { AuthFormService } from '@js-camp/angular/core/services/auth-form.service';

/** Sign in form service. */
@Injectable({ providedIn: 'root' })
export class SignInFormService extends AuthFormService {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Initialize sign in form. */
	public initialize(): SignInForm {
		return this.formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), super.validateNonNumericPassword]],
		});
	}
}
