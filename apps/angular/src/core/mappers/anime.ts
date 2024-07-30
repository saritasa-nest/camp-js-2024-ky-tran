import { Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime';
import { Anime } from '@js-camp/core/models/anime';
import { animeFromDto } from '@js-camp/core/mappers/anime-from-dto';

/** Anime mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeMapper {
	/**
	 * Mapping from DTO to Domain model.
	 * @param anime - The AnimeDto object to be converted.
	 * @returns The converted object.
	 */
	public fromDto(anime: AnimeDto): Anime {
		return animeFromDto(anime);
	}
}
