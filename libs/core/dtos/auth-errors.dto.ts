/** Auth error DTO. */
export type AuthErrorDto = Readonly<{

	/** Error code. */
	code: string;

	/** Error attr. */
	attr: string | null;

	/** Error detail. */
	detail: string;
}>;

/** Auth errors DTO. */
export type AuthErrorsDto = AuthErrorDto[];
