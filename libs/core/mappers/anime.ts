import { AnimeDto } from '../dtos/anime';
import { Anime } from '../models/anime';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

/** Anime mapper. */
export namespace AnimeMapper {

	/**
	 * Mapping from dto to domain model.
	 * @param anime - The AnimeDto object to be converted.
	 */
	export function fromDto(anime: AnimeDto): Anime {
		return {
			id: anime.id,
			createdAt: new Date(anime.created),
			modifiedAt: new Date(anime.modified),
			englishTitle: anime.title_eng,
			japaneseTitle: anime.title_jpn,
			imageUrl: anime.image,
			aired: {
				startAt: anime.aired.start ? new Date(anime.aired.start) : null,
				endAt: anime.aired.end ? new Date(anime.aired.end) : null,
			},
			type: AnimeTypeMapper.fromDto(anime.type),
			status: AnimeStatusMapper.fromDto(anime.status),
			averageScore: anime.score,
			userScore: anime.user_score,
			studioIds: anime.studios,
			genreIds: anime.genres,
		};
	}
}
