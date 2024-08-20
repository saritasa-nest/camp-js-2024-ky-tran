import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DEFAULT_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { AllError, AllErrorString } from '@js-camp/angular/shared/types/auth-form';
import { AuthErrors } from '@js-camp/core/models/auth-errors';

/** Form error service. */
@Injectable({ providedIn: 'root' })
export class AuthFormErrorService {
	private get requiredError(): AllErrorString {
		return { required: 'This field is required.' };
	}

	private get passwordError(): AllErrorString {
		return {
			...this.requiredError,
			minlength: ` Minimum length of password is ${PASSWORD_MIN_LENGTH}.`,
			numericPassword: 'Password can\'t be entirely numeric.',
		};
	}

	private get noAllSpaceError(): AllErrorString {
		return { noAllSpace: 'All space is not valid.' };
	}

	private getAllErrors(): AllError {
		return {
			email: { ...this.requiredError, email: 'Invalid email address.' },
			password: { ...this.passwordError },
			passwordConfirm: { ...this.passwordError, passwordsMismatch: 'Passwords must match.' },
			firstName: { ...this.requiredError, ...this.noAllSpaceError },
			lastName: { ...this.requiredError, ...this.noAllSpaceError },
		};
	}

	private getError(controlField: string, errorField: string): string {
		try {
			return this.getAllErrors()[controlField][errorField];
		} catch (error) {
			return 'Something went wrong.';
		}
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
