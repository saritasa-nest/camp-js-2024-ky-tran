/** User secret domain model. */
export type UserSecret = Readonly<{

	/** Access token. */
	accessToken: string;

	/** Refresh token. */
	refreshToken: string;
}>;
