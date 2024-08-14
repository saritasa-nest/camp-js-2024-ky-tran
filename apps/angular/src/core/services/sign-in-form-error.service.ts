import { Injectable, signal, WritableSignal } from '@angular/core';
import { PASSWORD_MIN_LENGTH } from '@js-camp/angular/shared/constants';
import { SignInForm } from '@js-camp/angular/app/features/auth/sign-in/sign-in.component';

type AllErrorString = Readonly<Record<string, string>>;
type AllError = Readonly<Record<string, AllErrorString>>;

/** Sign In Form Error service. */
@Injectable({ providedIn: 'root' })
export class SignInFormErrorService {
	/** Email error signal. */
	protected readonly emailErrorSignal = signal('');

	/** Password error signal. */
	protected readonly passwordErrorSignal = signal('');

	/**
	 * Get error.
	 * @param controlField Control field.
	 * @param errorField Error filed.
	 */
	public getError(controlField: string, errorField: string): string {
		return this.getAllErrors()[controlField][errorField];
	}

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

	/** Get email error signal. */
	public getEmailErrorSignal(): WritableSignal<string> {
		return this.emailErrorSignal;
	}

	/**
	 * Handle email error.
	 * @param form Form group.
	 */
	public handleEmailError(form: SignInForm): void {
		const { errors } = form.controls.email;
		const errorMessage = errors ? this.getError('email', Object.keys(errors)[0]) : '';

		this.emailErrorSignal.set(errorMessage);
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
	 * @param form Form group.
	 */
	public handlePasswordError(form: SignInForm): void {
		const { errors } = form.controls.password;
		const errorMessage = errors ? this.getError('password', Object.keys(errors)[0]) : '';

		this.passwordErrorSignal.set(errorMessage);
	}

	/** Clear password error. */
	public clearPasswordError(): void {
		this.passwordErrorSignal.set('');
	}
}
