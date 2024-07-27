import { Injectable } from '@angular/core';

import { typeMappingFromDto } from '@js-camp/angular/core/records/type-from-dto';
import { statusMappingFromDto } from '@js-camp/angular/core/records/status-from-dto';
import { AnimeDto } from '@js-camp/angular/core/dtos/anime.dto';
import { Anime, AnimeBluePrint } from '@js-camp/angular/core/models/anime';

/** Anime mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {
	/**
	 * Converts an AnimeDto object (snake_case to camelCase).
	 * @param anime - The AnimeDto object to be converted.
	 * @returns The converted object.
	 */
	public fromDto(anime: AnimeDto): Anime {
		return new AnimeBluePrint({
			id: anime.id,
			createdAt: new Date(anime.created),
			modifiedAt: new Date(anime.modified),
			titleEng: anime.title_eng,
			titleJpn: anime.title_jpn,
			image: anime.image,
			aired: { startAt: new Date(anime.aired.start), endAt: new Date(anime.aired.end) },
			type: typeMappingFromDto[anime.type],
			status: statusMappingFromDto[anime.status],
			score: anime.score,
			userScore: anime.user_score,
			studios: anime.studios,
			genres: anime.genres,
		});
	}
}
