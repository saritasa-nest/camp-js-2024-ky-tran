/** Date range. */
type DateRange = {
	/** Start date in ISO format. */
	readonly start: string;

	/** End date in ISO format. */
	readonly end: string;
}

/** Anime type. */
export enum AnimeType {
  Tv = 'Tv',
  Ova = 'Ova',
  Movie = 'Movie',
  Special = 'Special',
  Ona = 'Ona',
  Music = 'Music',
  PromotionalVideos = 'Promotional Videos',
  Unknown = 'Unknown',
}

/** Anime status. */
export enum AnimeStatus {
  Airing = 'Airing',
  Finished = 'Finished',
  NotYetAired = 'Not Yet Aired',
}

/** Anime. */
export type Anime = {

	/** The unique identifier of the anime. */
	readonly id: number;

	/** The creation date of the anime record in ISO format. */
	readonly created: string;

	/** The last modified date of the anime record in ISO format. */
	readonly modified: string;

	/** The English title of the anime. */
	readonly titleEng: string;

	/** The Japanese title of the anime. */
	readonly titleJpn: string;

	/** The URL of the anime's image. */
	readonly image: string;

	/** The airing date range of the anime. */
	readonly aired: DateRange;

	/** The type of the anime (e.g., TV). */
	readonly type: AnimeType;

	/** The current status of the anime (e.g., AIRING). */
	readonly status: AnimeStatus;

	/** The average score of the anime. */
	readonly score: number;

	/** The user's score for the anime. */
	readonly userScore: number;

	/** An array of IDs representing the studios that produced the anime. */
	readonly studios: number[];

	/** An array of IDs representing the genres of the anime. */
	readonly genres: number[];
};
