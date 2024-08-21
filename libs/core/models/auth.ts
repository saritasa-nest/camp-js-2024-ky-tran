/** Sign in domain model. */
export type SignIn = Readonly<{

	/** Email. */
	email: string;

	/** Password. */
	password: string;
}>;

/** Sign up domain model. */
export type SignUp = Readonly<{

	/** Email. */
	email: string;

	/** Password. */
	password: string;

	/** First name. */
	firstName: string;

	/** Last name. */
	lastName: string;
}>;
