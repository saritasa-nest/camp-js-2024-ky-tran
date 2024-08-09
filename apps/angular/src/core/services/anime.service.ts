import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';

import { UrlConfig } from '@js-camp/angular/config/url.config';
import { Pagination } from '@js-camp/core/models/pagination.model';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/angular/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlConfig = inject(UrlConfig);

	private readonly paginationMapper = inject(PaginationMapper);

	/**
	 * Get anime list.
	 * @param httpParams HttpParams.
	 */
	public getAnimeList(httpParams: HttpParams): Observable<Pagination<Anime>> {
		return this.httpClient.get<PaginationDto<AnimeDto>>(this.urlConfig.animeUrl, { params: httpParams })
			.pipe(
				map(responseDto => this.paginationMapper.fromDto(responseDto, AnimeMapper.fromDto)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				catchError((_: unknown) => throwError(() => new Error('Something went wrong. Please try again.'))),
			);
	}
}
