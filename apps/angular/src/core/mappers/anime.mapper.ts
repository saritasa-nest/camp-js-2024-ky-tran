import { Injectable } from '@angular/core';

import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { AnimeStatus, AnimeType } from '../models/anime.model';
import { toCapitalize } from '../utils/toCapitalize';

@Injectable({
  providedIn: 'root'
})
export class AnimeMapper {
	private convertStringDto<T extends string, U extends string>(str: T): U {
		return str.split('_').map(toCapitalize).join(' ') as U;
	}

	public fromDto(anime: AnimeDto) {
		return {
			id: anime.id,
			created: anime.created,
			modified: anime.modified,
			titleEng: anime.title_eng,
			titleJpn: anime.title_jpn,
			image: anime.image,
			aired: anime.aired,
			type: this.convertStringDto<AnimeTypeDto, AnimeType>(anime.type),
			status: this.convertStringDto<AnimeStatusDto, AnimeStatus>(anime.status),
			score: anime.score,
			userScore: anime.user_score,
			studios: anime.studios,
			genres: anime.genres,
		};
	}
}
 