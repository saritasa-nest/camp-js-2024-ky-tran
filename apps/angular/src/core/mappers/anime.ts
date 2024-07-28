import { Injectable } from '@angular/core';

import { TYPE_MAPPING_FROM_DTO } from '@js-camp/core/records/type-from-dto';
import { STATUS_MAPPING_FROM_DTO } from '@js-camp/core/records/status-from-dto';
import { AnimeDto } from '@js-camp/core/dtos/anime';
import { Anime, AnimeBluePrint } from '@js-camp/core/models/anime';

/** Anime mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeMapper {
	/**
	 * Mapping from DTO to Domain model.
	 * @param anime - The AnimeDto object to be converted.
	 * @returns The converted object.
	 */
	public fromDto(anime: AnimeDto): Anime {
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
			studios: anime.studios,
			genres: anime.genres,
		});
	}
}
