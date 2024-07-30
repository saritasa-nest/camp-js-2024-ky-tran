import { AnimeDto } from '../dtos/anime';
import { Anime, AnimeBluePrint } from '../models/anime';
import { STATUS_MAPPING_FROM_DTO } from '../records/status-from-dto';
import { TYPE_MAPPING_FROM_DTO } from '../records/type-from-dto';

/**
 * Mapping from DTO to Domain model.
 * @param anime - The AnimeDto object to be converted.
 * @returns The converted object.
 */
export function animeFromDto(anime: AnimeDto): Anime {
	return new AnimeBluePrint({
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
	});
}
