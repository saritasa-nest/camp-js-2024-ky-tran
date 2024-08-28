import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';
import { DateRangeDto } from './date-range.dto';

/** Anime overview DTO. */
export type AnimeOverviewDto = Readonly<{

	/** The unique identifier of the anime. */
	id: number;

	/**
	 * The creation date of the anime record in ISO format.
	 * @example 2024-07-28T04:43:27.035Z
	 */
	created: string;

	/**
	 * The last modified date of the anime record in ISO format.
	 * @example 2024-07-28T04:43:27.035Z
	 */
	modified: string;

	/** The English title of the anime. */
	title_eng: string;

	/** The Japanese title of the anime. */
	title_jpn: string;

	/** The URL of the anime's image. */
	image: string;

	/** The type of the anime (e.g., TV). */
	type: AnimeTypeDto;

	/** The current status of the anime (e.g., AIRING). */
	status: AnimeStatusDto;

	/** The airing date range of the anime. */
	aired: DateRangeDto;
}>;
