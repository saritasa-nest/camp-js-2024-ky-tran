import { FormControl, FormGroup } from '@angular/forms';

/** Sign in form. */
export type SignInForm = FormGroup<Readonly<{

	/** Email. */
	email: FormControl<string>;

	/** Password. */
	password: FormControl<string>;
}>>;

/** All error string. */
export type AllErrorString = Readonly<Record<string, string>>;

/** All error. */
export type AllError = Readonly<Record<string, AllErrorString>>;
