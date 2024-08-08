import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '../dtos/anime';
import { Anime } from '../models/anime';

import { AnimeTypeMapper } from './anime-type.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';

/** Anime mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeMapper {
	private readonly animeTypeMapper = inject(AnimeTypeMapper);

	private readonly animeStatusMapper = inject(AnimeStatusMapper);

	/**
	 * Mapping from dto to domain model.
	 * @param anime - The AnimeDto object to be converted.
	 */
	public fromDto(anime: AnimeDto): Anime {
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
			type: this.animeTypeMapper.fromDto(anime.type),
			status: this.animeStatusMapper.fromDto(anime.status),
			averageScore: anime.score,
			userScore: anime.user_score,
			studioIds: anime.studios,
			genreIds: anime.genres,
		};
	}
}
