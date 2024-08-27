/** Paths. */
type Paths = Readonly<{

	/** Home. */
	home: string;

	/** Anime details. */
	animeDetails: (id: number) => string;

	/** User profile. */
	userProfile: string;

	/** Sign in. */
	signIn: string;
}>;

/** Url paths. */
export const PATHS: Paths = {
	home: '/',
	animeDetails: (id: number): string => `/anime/${id}`,
	userProfile: '/user/profile',
	signIn: '/auth/signin',
};
