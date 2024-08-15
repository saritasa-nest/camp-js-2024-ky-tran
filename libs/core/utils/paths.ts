/** Paths. */
type Paths = Readonly<{

	/** Home. */
	home: string;

	/** User profile. */
	userProfile: string;

	/** Sign in. */
	signIn: string;
}>;

/** Url paths. */
export const PATHS: Paths = {
	home: '/',
	userProfile: '/user/profile',
	signIn: '/auth/signin',
};
