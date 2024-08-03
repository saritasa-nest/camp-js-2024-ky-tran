import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime.model';
import { STATUS_MAPPING_FROM_DTO } from '../records/status-mapping.record';
import { TYPE_MAPPING_FROM_DTO } from '../records/type-mapping.record';

/** Anime mappers namespace. */
export namespace AnimeMappers {

	/**
	 * Mapping from DTO to Domain model.
	 * @param anime - The AnimeDto object to be converted.
	 */
	export function animeFromDto(anime: AnimeDto): Anime {
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
			type: TYPE_MAPPING_FROM_DTO[anime.type],
			status: STATUS_MAPPING_FROM_DTO[anime.status],
			averageScore: anime.score,
			userScore: anime.user_score,
			studioIds: anime.studios,
			genreIds: anime.genres,
		};
	}
}
