import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

/** Anime mapper. */
export namespace AnimeMapper {

	/**
	 * Mapping from dto to domain model.
	 * @param dto Anime DTO.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			createdAt: new Date(dto.created),
			modifiedAt: new Date(dto.modified),
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			imageUrl: dto.image,
			aired: {
				startAt: dto.aired.start ? new Date(dto.aired.start) : null,
				endAt: dto.aired.end ? new Date(dto.aired.end) : null,
			},
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
			averageScore: dto.score,
			userScore: dto.user_score,
			studioIds: dto.studios,
			genreIds: dto.genres,
		};
	}
}
