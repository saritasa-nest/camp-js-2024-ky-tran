import { DateRange } from './date-range';

/** Anime type. */
export enum AnimeType {
	Tv = 'TV',
	Ova = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	Ona = 'ONA',
	Music = 'Music',
	PromotionalVideos = 'Promotional Videos',
	Unknown = 'Unknown',
}

/** Anime status. */
export enum AnimeStatus {
	Airing = 'Currently Airing',
	Finished = 'Finished Airing',
	NotYetAired = 'Not Yet Aired',
}

/** Anime. */
export type Anime = Readonly<{

	/** The unique identifier of the anime. */
	id: number;

	/** The creation date of the anime. */
	createdAt: Date;

	/** The last modified date of the anime. */
	modifiedAt: Date;

	/** The English title of the anime. */
	englishTitle: string;

	/** The Japanese title of the anime. */
	japaneseTitle: string;

	/** The URL of the anime's image. */
	imageUrl: string;

	/** The airing date range of the anime. */
	aired: DateRange;

	/** The type of the anime (e.g., TV). */
	type: AnimeType;

	/** The current status of the anime (e.g., AIRING). */
	status: AnimeStatus;

	/** The average score of the anime. */
	averageScore: number | null;

	/** The user's score for the anime. */
	userScore: number | null;

	/** An array of IDs representing the studios that produced the anime. */
	studioIds: readonly number[];

	/** An array of IDs representing the genres of the anime. */
	genreIds: readonly number[];
}>;
