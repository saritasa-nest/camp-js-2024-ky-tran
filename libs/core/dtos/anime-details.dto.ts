import { AnimeStatusDto, AnimeTypeDto } from './anime.dto';
import { AnimeRatingDto } from './anime-rating-dto';
import { AnimeSeasonDto } from './anime-season.dto';
import { AnimeSourceDto } from './anime-source-dto';
import { DateRangeDto } from './date-range.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime details DTO. */
export type AnimeDetailsDto = {

	/** Id. */
	readonly id: number;

	/** Image. */
	readonly image: string;

	/** Youtube trailer id. */
	readonly trailer_youtube_id: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Rating. */
	readonly rating: AnimeRatingDto;

	/** Source. */
	readonly source: AnimeSourceDto;

	/** Season. */
	readonly season: AnimeSeasonDto;

	/** Synopsis. */
	readonly synopsis: string;

	/** Airing status. */
	readonly airing: boolean;

	/** Aired date. */
	readonly aired: DateRangeDto;

	/** A list of anime studios. */
	readonly studios_data: readonly StudioDto[];

	/** A list of anime genres. */
	readonly genres_data: readonly GenreDto[];
};
