import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { AppConfig } from '@js-camp/angular/config/app-config';
import { AnimeMapper } from '@js-camp/angular/core/mappers/anime.mapper';
import { Anime } from '@js-camp/angular/core/models/anime';
import { AnimeDto } from '@js-camp/angular/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly appConfig = inject(AppConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	/**
	 * Get anime list.
	 * @returns Observable of anime list with pagination data.
	 */
	public getAll(): Observable<Pagination<Anime>> {
		const { mapPaginationFromDto } = this.paginationMapper;
		const mapAnimeFromDto = this.animeMapper.fromDto;

		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.appConfig.animeUrl)
			.pipe(
				map(responseDto => mapPaginationFromDto(responseDto, mapAnimeFromDto)),
				catchError((error: unknown) => {
					if (!this.appConfig.isProduction) {
						console.error({ error });
					}

					const newError = new Error('Failed to fetch anime. Please try again.');
					return throwError(() => newError);
				}),
			);
	}
}
