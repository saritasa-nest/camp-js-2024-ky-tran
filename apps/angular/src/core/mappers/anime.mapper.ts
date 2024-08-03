import { Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeMappers } from '@js-camp/core/mappers/anime.mapper';

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
