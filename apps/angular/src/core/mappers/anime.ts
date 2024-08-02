import { Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeMappers } from '@js-camp/core/mappers/anime';

/** Anime mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeMapper {
	/**
	 * Mapping from DTO to Domain model.
	 * @param anime - The AnimeDto object to be converted.
	 */
	public fromDto(anime: AnimeDto): Anime {
		return AnimeMappers.animeFromDto(anime);
	}
}
