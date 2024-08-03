import { DateRangeDto } from './date-range';

/** Anime Type DTO. */
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

/** Anime Status DTO. */
export enum AnimeStatusDto {
	Airing = 'AIRING',
	Finished = 'FINISHED',
	NotYetAired = 'NOT_YET_AIRED',
}

/** Anime DTO. */
export type AnimeDto = Readonly<{

	/**
	 * The unique identifier of the anime.
	 * @example 2024-07-28T04:43:27.035Z
	 */
	id: number;

	/**
	 * The creation date of the anime record in ISO format.
	 * @example 2024-07-28T04:43:27.035Z
	 */
	created: string;

	/** The last modified date of the anime record in ISO format. */
	modified: string;

	/** The English title of the anime. */
	title_eng: string;

	/** The Japanese title of the anime. */
	title_jpn: string;

	/** The URL of the anime's image. */
	image: string;

	/** The airing date range of the anime. */
	aired: DateRangeDto;

	/** The type of the anime (e.g., TV). */
	type: AnimeTypeDto;

	/** The current status of the anime (e.g., AIRING). */
	status: AnimeStatusDto;

	/** The average score of the anime. */
	score: number | null;

	/** The user's score for the anime. */
	user_score: number | null;

	/** An array of IDs representing the studios that produced the anime. */
	studios: readonly number[];

	/** An array of IDs representing the genres of the anime. */
	genres: readonly number[];
}>;
