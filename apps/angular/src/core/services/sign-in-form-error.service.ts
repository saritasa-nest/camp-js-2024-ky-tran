import { Injectable, signal, WritableSignal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { AllError, AllErrorString, SignInForm } from '@js-camp/angular/shared/types/auth-form';

/** Sign in form error service. */
@Injectable({ providedIn: 'root' })
export class SignInFormErrorService {
	/** Email error signal. */
	protected readonly emailErrorSignal = signal('');

	/** Password error signal. */
	protected readonly passwordErrorSignal = signal('');

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

	private handleErrorMessage(field: string, errors: ValidationErrors | null): string {
		return errors ? this.getError(field, Object.keys(errors)[0]) : '';
	}

	/**
	 * Handle all error inputs at once.
	 * @param form Sign in form.
	 */
	public handleAllErrorInputsAtOnce(form: SignInForm): void {
		this.handleEmailError(form);
		this.handlePasswordError(form);
	}

	/** Get email error signal. */
	public getEmailErrorSignal(): WritableSignal<string> {
		return this.emailErrorSignal;
	}

	/**
	 * Handle email error.
	 * @param form Sign in form.
	 */
	public handleEmailError(form: SignInForm): void {
		this.emailErrorSignal.set(this.handleErrorMessage('email', form.controls.email.errors));
	}

	/** Clear email error. */
	public clearEmailError(): void {
		this.emailErrorSignal.set('');
	}

	/** Get password error signal. */
	public getPasswordErrorSignal(): WritableSignal<string> {
		return this.passwordErrorSignal;
	}

	/**
	 * Handle password error.
	 * @param form Sign in form.
	 */
	public handlePasswordError(form: SignInForm): void {
		this.passwordErrorSignal.set(this.handleErrorMessage('password', form.controls.password.errors));
	}

	/** Clear password error. */
	public clearPasswordError(): void {
		this.passwordErrorSignal.set('');
	}
}
