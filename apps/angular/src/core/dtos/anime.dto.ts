/** Date Range DTO */
type DateRangeDto = {
	/** Start date in ISO format. */
	readonly start: string;

	/** End date in ISO format. */
	readonly end: string;
}

/** Anime Type DTO */
export enum AnimeTypeDto {
	Tv = 'TV',
	Ova = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	Ona = 'ONA',
	Music = 'MUSIC',
	PromotionalVideos = 'PROMOTIONAL_VIDEOS',
	Unknown = 'UNKNOWN',
}

/** Anime Status DTO */
export enum AnimeStatusDto {
	Airing = 'AIRING',
	Finished = 'FINISHED',
	NotYetAired = 'NOT_YET_AIRED',
}

/** Anime DTO. */
export type AnimeDto = {

	/** The unique identifier of the anime. */
	readonly id: number;

	/** The creation date of the anime record in ISO format. */
	readonly created: string;

	/** The last modified date of the anime record in ISO format. */
	readonly modified: string;

	/** The English title of the anime. */
	readonly title_eng: string;

	/** The Japanese title of the anime. */
	readonly title_jpn: string;

	/** The URL of the anime's image. */
	readonly image: string;

	/** The airing date range of the anime. */
	readonly aired: DateRangeDto;

	/** The type of the anime (e.g., TV). */
	readonly type: AnimeTypeDto;

	/** The current status of the anime (e.g., AIRING). */
	readonly status: AnimeStatusDto;

	/** The average score of the anime. */
	readonly score: number;

	/** The user's score for the anime. */
	readonly user_score: number;

	/** An array of IDs representing the studios that produced the anime. */
	readonly studios: number[];

	/** An array of IDs representing the genres of the anime. */
	readonly genres: number[];
};
