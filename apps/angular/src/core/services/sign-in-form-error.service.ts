import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DEFAULT_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { AllError, AllErrorString } from '@js-camp/angular/shared/types/auth-form';
import { AuthErrors } from '@js-camp/core/models/auth-errors.model';

/** Sign in form error service. */
@Injectable({ providedIn: 'root' })
export class SignInFormErrorService {
	private createRequiredError(field: string): AllErrorString {
		return { required: `${field} is required.` };
	}

	private getAllErrors(): AllError {
		return {
			email: {
				...this.createRequiredError('Email'),
				email: 'Invalid email address.',
			},
			password: {
				...this.createRequiredError('Password'),
				minlength: ` Minimum length of password is ${PASSWORD_MIN_LENGTH}.`,
				numericPassword: 'Password can\'t be entirely numeric.',
			},
		};
	}

	private getError(controlField: string, errorField: string): string {
		return this.getAllErrors()[controlField][errorField];
	}

	/**
	 * Handle error message.
	 * @param field Field.
	 * @param errors Validation errors.
	 */
	public handleErrorMessage(field: string, errors: ValidationErrors | null): string {
		return errors ? this.getError(field, Object.keys(errors)[0]) : '';
	}

	/**
	 * Handle submit error.
	 * @param errors Errors.
	 */
	public handleSubmitError(errors: AuthErrors): { actionErrorMessage: string; } {
		const actionError = errors.find(error => error.field == null);
		return { actionErrorMessage: actionError ? actionError.message : DEFAULT_ERROR_MESSAGE };
	}
}
