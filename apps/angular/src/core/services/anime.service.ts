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
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime-details.mapper';

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
	public getList(filterParams: AnimeFilterParams.Combined): Observable<Pagination<Anime>> {
		const httpParams = this.animeUrlService.createAnimeHttpParams(filterParams);

		return this.httpClient.get<PaginationDto<AnimeDto>>(this.urlConfig.animeUrl, { params: httpParams })
			.pipe(
				map(responseDto => PaginationMapper.fromDto(responseDto, AnimeMapper.fromDto)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				catchError((error: unknown) => throwError(() => this.handleError(error))),
			);
	}

	/**
	 * Get anime details by id.
	 * @param id Id.
	 */
	public getDetails(id: number): Observable<AnimeDetails> {
		return this.httpClient.get<AnimeDetailsDto>(`${this.urlConfig.animeUrl}${id}/`)
			.pipe(
				map(animeDetailsDto => AnimeDetailsMapper.fromDto(animeDetailsDto)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				catchError((error: unknown) => throwError(() => this.handleError(error))),
			);
	}
}
