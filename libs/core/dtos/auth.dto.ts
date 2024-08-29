/** Sign in DTO. */
export type SignInDto = Readonly<{

	/** Email. */
	email: string;

	/** Password. */
	password: string;
}>;

/** Sign up DTO. */
export type SignUpDto = Readonly<{

	/** Email. */
	email: string;

	/** Password. */
	password: string;

	/** First name. */
	first_name: string;

	/** Last name. */
	last_name: string;
}>;
