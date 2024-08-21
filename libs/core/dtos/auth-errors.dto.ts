/** Auth error field DTO. */
export enum AuthErrorSignInFieldDto {
	Email = 'email',
	Password = 'password',
}

/** Auth error DTO. */
export type AuthErrorDto = Readonly<{

	/** Error code. */
	code: string;

	/** Error attr. */
	attr: AuthErrorSignInFieldDto | string;

	/** Error detail. */
	detail: string;
}>;

/** Auth errors DTO. */
export type AuthErrorsDto = AuthErrorDto[];
