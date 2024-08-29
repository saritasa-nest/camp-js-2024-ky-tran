/** User secret DTO. */
export type UserSecretDto = Readonly<{

	/** Access token. */
	access: string;

	/** Refresh token. */
	refresh: string;
}>;
