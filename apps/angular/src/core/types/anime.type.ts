import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/angular/core/dtos/anime.dto';
import { Anime } from '@js-camp/angular/core/models/anime.model';

/** Paginated Anime Dto. */
export type PaginatedAnimeDto = PaginationDto<AnimeDto>;

/** All Anime Kit type. */
export type AllAnimeKit = {

	/** Fetching data loading status. */
	readonly isLoading: boolean;

	/** Error message for wrong fetching. */
	readonly error: string;

	/** A list of all anime. */
	readonly results: readonly Anime[];
};
