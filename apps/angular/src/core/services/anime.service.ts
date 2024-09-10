import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { UrlConfig } from '@js-camp/angular/config/url.config';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeUrlService } from '@js-camp/angular/core/services/anime-url.service';
import { AnimeOverview } from '@js-camp/core/models/anime-overview';
import { AnimeOverviewDto } from '@js-camp/core/dtos/anime-overview.dto';
import { AnimeOverviewMapper } from '@js-camp/core/mappers/anime-overview.mapper';
import { AnimeExtended } from '@js-camp/core/models/anime-extended';
import { AnimeExtendedDto } from '@js-camp/core/dtos/anime-extended.dto';
import { AnimeExtendedMapper } from '@js-camp/core/mappers/anime-extended.mapper';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlConfig = inject(UrlConfig);

	private readonly animeUrlService = inject(AnimeUrlService);

	private handleError(error: unknown): Error {
		const errorMessage = error && typeof error === 'object' && 'message' in error ? error.message : 'unknown error';
		return new Error(`Something went wrong. Please try again. Error message: ${errorMessage}`);
	}

	/**
	 * Get anime list.
	 * @param filterParams Anime filter params.
	 */
	public getList(filterParams: AnimeFilterParams.Combined): Observable<Pagination<AnimeOverview>> {
		const httpParams = this.animeUrlService.createAnimeHttpParams(filterParams);

		return this.httpClient.get<PaginationDto<AnimeOverviewDto>>(this.urlConfig.animeUrl, { params: httpParams })
			.pipe(
				map(responseDto => PaginationMapper.fromDto(responseDto, AnimeOverviewMapper.fromDto)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				catchError((error: unknown) => throwError(() => this.handleError(error))),
			);
	}

	/**
	 * Get anime details by id.
	 * @param id Id.
	 */
	public getDetails(id: number): Observable<AnimeExtended> {
		return this.httpClient.get<AnimeExtendedDto>(`${this.urlConfig.animeUrl}${encodeURIComponent(id)}/`)
			.pipe(
				map(animeDetailsDto => AnimeExtendedMapper.fromDto(animeDetailsDto)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				catchError((error: unknown) => throwError(() => this.handleError(error))),
			);
	}

	/**
	 * Delete anime by id.
	 * @param id Id.
	 */
	public deleteById(id: number): Observable<void> {
		return this.httpClient.delete<void>(`${this.urlConfig.animeUrl}${encodeURIComponent(id)}/`)
			.pipe(
				map(() => undefined),
				catchError((error: unknown) => throwError(() => this.handleError(error))),
			);
	}
}
