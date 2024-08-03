import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';

import { UrlConfig } from '@js-camp/angular/config/url.config';
import { AnimeMapper } from '@js-camp/angular/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/angular/core/mappers/pagination.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination.model';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlConfig = inject(UrlConfig);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	/**
	 * Get anime list.
	 * @param httpParams HttpParams.
	 */
	public getAll(httpParams: HttpParams): Observable<Pagination<Anime>> {
		const { mapPaginationFromDto } = this.paginationMapper;
		const mapAnimeFromDto = this.animeMapper.fromDto;

		return this.httpClient.get<PaginationDto<AnimeDto>>(this.urlConfig.animeUrl, { params: httpParams })
			.pipe(
				map(responseDto => mapPaginationFromDto(responseDto, mapAnimeFromDto)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				catchError((_: unknown) => throwError(() => new Error('Failed to fetch anime. Please try again.'))),
			);
	}
}
