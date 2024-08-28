import { AnimeExtendedDto } from '../dtos/anime-extended.dto';
import { AnimeExtended } from '../models/anime-extended';

import { AnimeSourceMapper } from './ anime-source-mapper';
import { AnimeOverviewMapper } from './anime-overview.mapper';
import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSeasonMapper } from './anime-season.mapper';
import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeExtendedMapper {

	/**
	 * Maps from DTO to domain model.
	 * @param dto Anime extended dto.
	 */
	export function fromDto(dto: AnimeExtendedDto): AnimeExtended {
		return new AnimeExtended({
			...AnimeOverviewMapper.fromDto(dto),
			youtubeTrailerId: dto.trailer_youtube_id,
			rating: AnimeRatingMapper.fromDto(dto.rating),
			season: AnimeSeasonMapper.fromDto(dto.season),
			source: AnimeSourceMapper.fromDto(dto.source),
			synopsis: dto.synopsis,
			airingStatus: dto.airing ? 'Airing' : 'Finish airing',
			studios: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
			genres: dto.genres_data.map(genre => GenreMapper.fromDto(genre)),
		});
	}
}
