/** User DTO. */
export type UserDto = Readonly<{

	/** Email. */
	email: string;

	/** First name. */
	first_name: string;

	/** Last name. */
	last_name: string;

	/** Avatar. */
	avatar: string | null;

	/** Created at. */
	created: string;

	/** Modified at. */
	modified: string;
}>;
