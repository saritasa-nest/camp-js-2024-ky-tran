import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { DateRangeMapper } from './date-range.mapper';

/** Anime mapper. */
export namespace AnimeMapper {

	/**
	 * Mapping from dto to domain model.
	 * @param dto Anime DTO.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			createdAt: DateRangeMapper.parseDateFromDto(dto.created),
			modifiedAt: DateRangeMapper.parseDateFromDto(dto.modified),
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			imageUrl: dto.image,
			aired: DateRangeMapper.fromDto(dto.aired),
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
			averageScore: dto.score,
			userScore: dto.user_score,
			studioIds: dto.studios,
			genreIds: dto.genres,
		};
	}
}
