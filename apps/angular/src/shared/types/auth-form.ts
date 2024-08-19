import { FormControl, FormGroup } from '@angular/forms';

/** All error string. */
export type AllErrorString = Readonly<Record<string, string>>;

/** All error. */
export type AllError = Readonly<Record<string, AllErrorString>>;

/** Sign in form. */
export type SignInForm = FormGroup<Readonly<{

	/** Email. */
	email: FormControl<string>;

	/** Password. */
	password: FormControl<string>;
}>>;

/** Sign up form. */
export type SignUpForm = FormGroup<Readonly<{

	/** Email. */
	email: FormControl<string>;

	/** Name. */
	name: FormGroup<Readonly<{

		/** First name. */
		firstName: FormControl<string>;

		/** Last name. */
		lastName: FormControl<string>;
	}>>;

	/** Passwords. */
	passwords: FormGroup<Readonly<{

		/** Password. */
		password: FormControl<string>;

		/** Password confirm. */
		passwordConfirm: FormControl<string>;
	}>>;

}>>;
