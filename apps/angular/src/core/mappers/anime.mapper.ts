import { Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime';
import { AnimeMapper as BaseAnimeMapper } from '@js-camp/core/mappers/anime';
import { Anime } from '@js-camp/core/models/anime';

/** Anime mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeMapper {
	/**
	 * Mapping from dto to domain model.
	 * @param anime - The AnimeDto object to be converted.
	 */
	public fromDto(anime: AnimeDto): Anime {
		return BaseAnimeMapper.fromDto(anime);
	}
}
