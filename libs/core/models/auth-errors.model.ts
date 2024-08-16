/** Auth error domain model. */
export type AuthError = Readonly<{

	/** Error field. */
	field: string | null;

	/** Error message. */
	message: string;
}>;

/** Auth errors domain model. */
export type AuthErrors = AuthError[];
