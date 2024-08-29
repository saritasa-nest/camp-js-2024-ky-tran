/** Auth sign in error DTO. */
export enum AuthSignInFieldErrorDto {
	Email = 'email',
	Password = 'password',
}

/** Auth sign in error DTO. */
export type AuthSignInErrorDto = Readonly<{

	/** Error code. */
	code: string;

	/** Error attr. */
	attr: AuthSignInFieldErrorDto | string;

	/** Error detail. */
	detail: string;
}>;

/** Auth errors DTO. */
export type AuthSignInErrorsDto = AuthSignInErrorDto[];

/** Auth sign up error DTO. */
export enum AuthSignUpFieldErrorDto {
	Email = 'email',
	Password = 'password',
	FirstName = 'first_name',
	LastName = 'last_name',
}

/** Auth sign up error DTO. */
export type AuthSignUpErrorDto = Readonly<{

	/** Error code. */
	code: string;

	/** Error attr. */
	attr: AuthSignUpFieldErrorDto | string;

	/** Error detail. */
	detail: string;
}>;

/** Auth errors DTO. */
export type AuthSignUpErrorsDto = AuthSignUpErrorDto[];
