import { AnimeDetailsDto } from '../dtos/anime-details.dto';
import { AnimeDetails } from '../models/anime-details';

import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSourceMapper } from './ anime-source-mapper';
import { AnimeSeasonMapper } from './anime-season.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';
import { DateRangeMapper } from './date-range.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
		return new AnimeDetails({
			id: dto.id,
			imageSrc: dto.image,
			youtubeTrailerId: dto.trailer_youtube_id ?? '',
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
			rating: AnimeRatingMapper.fromDto(dto.rating),
			source: AnimeSourceMapper.fromDto(dto.source),
			season: AnimeSeasonMapper.fromDto(dto.season),
			synopsis: dto.synopsis,
			airingStatus: dto.airing ? 'Airing' : 'Finish airing',
			aired: DateRangeMapper.fromDto(dto.aired),
			studios: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
			genres: dto.genres_data.map(genre => GenreMapper.fromDto(genre)),
		});
	}
}
