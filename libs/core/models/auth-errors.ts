/** Auth sign in field error. */
export enum AuthSignInFieldError {
	Email = 'email',
	Password = 'password',
}

/** Auth sign in error domain model. */
export type AuthSignInError = Readonly<{

	/** Error field. */
	field: AuthSignInFieldError | null;

	/** Error message. */
	message: string;
}>;

/** Auth sign in errors domain model. */
export type AuthSignInErrors = AuthSignInError[];

/** Auth sign up field error. */
export enum AuthSignUpFieldError {
	Email = 'email',
	Password = 'password',
	FirstName = 'firstName',
	LastName = 'lastName',
}

/** Auth sign up error domain model. */
export type AuthSignUpError = Readonly<{

	/** Error field. */
	field: AuthSignUpFieldError | null;

	/** Error message. */
	message: string;
}>;

/** Auth sign up errors domain model. */
export type AuthSignUpErrors = AuthSignUpError[];
