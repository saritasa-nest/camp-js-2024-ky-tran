import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { UrlConfig } from '@js-camp/angular/config/url.config';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeUrlService } from '@js-camp/angular/core/services/anime-url.service';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlConfig = inject(UrlConfig);

	private readonly animeUrlService = inject(AnimeUrlService);

	/**
	 * Get anime list.
	 * @param filterParams Anime filter params.
	 */
	public getAnimeList(filterParams: AnimeFilterParams.Combined): Observable<Pagination<Anime>> {
		const httpParams = this.animeUrlService.createHttpAnimeQueryParams(filterParams);

		return this.httpClient.get<PaginationDto<AnimeDto>>(this.urlConfig.animeUrl, { params: httpParams })
			.pipe(
				map(responseDto => PaginationMapper.fromDto(responseDto, AnimeMapper.fromDto)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				catchError((_: unknown) => throwError(() => new Error('Something went wrong. Please try again.'))),
			);
	}
}
