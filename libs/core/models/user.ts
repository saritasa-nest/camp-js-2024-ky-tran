/** User domain model. */
export type User = Readonly<{

	/** Email. */
	email: string;

	/** First name. */
	firstName: string;

	/** Last name. */
	lastName: string;

	/** Avatar. */
	avatar: string | null;

	/** Created at. */
	createdAt: Date;

	/** Modified at. */
	modifiedAt: Date;
}>;
