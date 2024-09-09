import { AnimeOverviewDto } from './anime-overview.dto';
import { AnimeRatingDto } from './anime-rating-dto';
import { AnimeSeasonDto } from './anime-season.dto';
import { AnimeSourceDto } from './anime-source-dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime extended DTO. */
export type AnimeExtendedDto = AnimeOverviewDto & Readonly<{

	/** Youtube trailer id. */
	trailer_youtube_id: string;

	/** Rating. */
	rating: AnimeRatingDto;

	/** Source. */
	source: AnimeSourceDto;

	/** Season. */
	season: AnimeSeasonDto;

	/** Synopsis. */
	synopsis: string;

	/** Airing status. */
	airing: boolean;

	/** A list of anime studios. */
	studios_data: readonly StudioDto[];

	/** A list of anime genres. */
	genres_data: readonly GenreDto[];
}>;
