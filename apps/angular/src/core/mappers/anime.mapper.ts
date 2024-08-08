import { Injectable } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper as BaseAnimeMapper } from '@js-camp/core/mappers/anime.mapper';

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
