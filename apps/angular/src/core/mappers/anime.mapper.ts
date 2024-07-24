import { Injectable } from '@angular/core';

import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Anime, AnimeBluePrint, AnimeStatus, AnimeType } from '../models/anime.model';

/** Map AnimeStatusDto to AnimeStatus. */
const statusMapping: Record<AnimeStatusDto, AnimeStatus> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

/** Record for mapping AnimeTypeDto to AnimeType. */
const typeMapping: Record<AnimeTypeDto, AnimeType> = {
	[AnimeTypeDto.Tv]: AnimeType.Tv,
	[AnimeTypeDto.Ova]: AnimeType.Ova,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.Ona]: AnimeType.Ona,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
};

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
			aired: anime.aired,
			type: typeMapping[anime.type],
			status: statusMapping[anime.status],
			score: anime.score,
			userScore: anime.user_score,
			studios: anime.studios,
			genres: anime.genres,
		});
	}
}
