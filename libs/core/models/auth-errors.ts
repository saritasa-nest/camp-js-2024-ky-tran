/** Auth error field. */
export enum AuthErrorSignInField {
	Email = 'email',
	Password = 'password',
}

/** Auth error domain model. */
export type AuthError = Readonly<{

	/** Error field. */
	field: AuthErrorSignInField | null;

	/** Error message. */
	message: string;
}>;

/** Auth errors domain model. */
export type AuthErrors = AuthError[];
