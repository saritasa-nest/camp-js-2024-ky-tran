import { inject, Injectable } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { SignUpForm } from '@js-camp/angular/shared/types/auth-form';
import { AuthFormService } from '@js-camp/angular/core/services/auth-form.service';

/** Sign up form service. */
@Injectable({ providedIn: 'root' })
export class SignUpFormService extends AuthFormService {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	private form: SignUpForm | null = null;

	/** Initialize sign up form. */
	public initialize(): SignUpForm {
		const nameValidators = [Validators.required, this.noAllSpaceValidator];
		const passwordValidators = [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), super.validateNonNumericPassword];

		this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			firstName: ['', nameValidators],
			lastName: ['', nameValidators],
			password: ['', passwordValidators],
			passwordConfirm: ['', [...passwordValidators, this.passwordsMatchValidator.bind(this)]],
		});

		return this.form;
	}

	private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
		const password = this.form?.controls.password.value ?? null;
		const passwordConfirm = control.value;
		return password === passwordConfirm ? null : { passwordsMismatch: true };
	}

	private noAllSpaceValidator(control: AbstractControl): ValidationErrors | null {
		return control.value.trim() !== '' ? null : { noAllSpace: true };
	}
}
