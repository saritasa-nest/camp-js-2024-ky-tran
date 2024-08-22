import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DEFAULT_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { AllError, AllErrorString } from '@js-camp/angular/shared/types/auth-form';

/** Form error service. */
@Injectable({ providedIn: 'root' })
export class AuthFormErrorService {
	private allErrors: AllError = {
		email: { ...this.requiredError, ...this.serverError, email: 'Invalid email address.' },
		password: { ...this.passwordError, ...this.serverError },
		passwordConfirm: { ...this.passwordError, ...this.serverError },
		firstName: { ...this.requiredError, ...this.noAllSpaceError, ...this.serverError },
		lastName: { ...this.requiredError, ...this.noAllSpaceError, ...this.serverError },
	};

	private get requiredError(): AllErrorString {
		return { required: 'This field is required.' };
	}

	private get passwordError(): AllErrorString {
		return {
			...this.requiredError,
			minlength: ` Minimum length of password is ${PASSWORD_MIN_LENGTH}.`,
			numericPassword: 'Password can\'t be entirely numeric.',
			mismatchPasswords: 'Both passwords need to be identical.',
		};
	}

	private get noAllSpaceError(): AllErrorString {
		return { noAllSpace: 'All space is not valid.' };
	}

	private get serverError(): AllErrorString {
		return { serverError: DEFAULT_ERROR_MESSAGE };
	}

	/**
	 * Handle error message.
	 * @param controlField Control field.
	 * @param errorField Error field.
	 * @param errorMessage Error message.
	 */
	public setError(controlField: string, errorField: string, errorMessage: string): void {
		this.allErrors[controlField][errorField] = errorMessage;
	}

	private getError(controlField: string, errorField: string): string {
		try {
			return this.allErrors[controlField][errorField];
		} catch (error) {
			return 'Something went wrong.';
		}
	}

	/**
	 * Handle error message.
	 * @param field Field.
	 * @param errors Validation errors.
	 */
	public handleErrorMessage(field: string, errors: ValidationErrors | null): string | null {
		return errors ? this.getError(field, Object.keys(errors)[0]) : null;
	}
}
