import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { AppConfig } from '@js-camp/angular/config/app-config';
import { UrlConfig } from '@js-camp/angular/config/url-config';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime';
import { PaginationMapper } from '@js-camp/angular/core/mappers/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly appConfig = inject(AppConfig);

	private readonly urlConfig = inject(UrlConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly paginationMapper = inject(PaginationMapper);

	/** Get anime list. */
	public getAnimeList(): Observable<Pagination<Anime>> {
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.urlConfig.animeUrl)
			.pipe(
				map(responseDto => this.paginationMapper.fromDto(responseDto, AnimeMapper.fromDto)),
				catchError((error: unknown) => {
					if (!this.appConfig.isProduction) {
						console.error({ error });
					}

					return throwError(() => new Error('Failed to fetch anime. Please try again.'));
				}),
			);
	}
}
