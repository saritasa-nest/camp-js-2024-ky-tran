import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, switchMap, throwError } from 'rxjs';

import { UrlConfig } from '@js-camp/angular/config/url-config';
import { AnimeMapper } from '@js-camp/angular/core/mappers/anime';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime';
import { PaginationMapper } from '@js-camp/angular/core/mappers/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination';
import { Pagination } from '@js-camp/core/models/pagination';
import { UrlService } from '@js-camp/angular/core/services/url.service';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlConfig = inject(UrlConfig);

	private readonly urlService = inject(UrlService);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	/**
	 * Get anime list.
	 * @returns Observable of anime list with pagination data.
	 */
	public getAll(): Observable<Pagination<Anime>> {
		const { mapPaginationFromDto } = this.paginationMapper;
		const mapAnimeFromDto = this.animeMapper.fromDto;

		return this.urlService.createHttpQueryParams().pipe(
			switchMap(httpParams =>
				this.httpClient.get<PaginationDto<AnimeDto>>(this.urlConfig.animeUrl, { params: httpParams })
					.pipe(
						map(responseDto => mapPaginationFromDto(responseDto, mapAnimeFromDto)),
						shareReplay({ refCount: true, bufferSize: 1 }),
						catchError((_: unknown) => throwError(() => new Error('Failed to fetch anime. Please try again.'))),
					)),
		);
	}
}
