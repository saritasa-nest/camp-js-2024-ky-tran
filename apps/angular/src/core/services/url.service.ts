import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';
import { AnimeQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeQueryParamsUrlDto } from '@js-camp/core/dtos/anime-query-params-url.dto';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';
import { AnimeQueryParamsUrlMapper } from '@js-camp/core/mappers/anime-query-params-url.mapper';

/** Url Service. */
@Injectable({ providedIn: 'root' })
export class UrlService {
	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly queryParamsService = inject(QueryParamsService);

	private removeNullFields<O extends { [key: string]: unknown; }>(obj: O): Partial<O> {
		return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null)) as Partial<O>;
	}

	/**
	 * Create Http query params.
	 * @param params Query params.
	 */
	public createHttpQueryParams(params: AnimeQueryParams.Combined): HttpParams {
		const paramsDto = AnimeQueryParamsMapper.toDto(params, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);

		return Object.entries(paramsDto).reduce((httpPrams, [key, value]) =>
			value != null ? httpPrams.set(key, value.toString()) : httpPrams
		, new HttpParams());
	}

	/**
	 * Updates the URL query params.
	 * @param params The provided query params.
	 * @param resetParams The provided reset params.
	 */
	public updateQueryParams(
		params: Partial<AnimeQueryParams.Combined>,
		resetParams: Partial<AnimeQueryParams.Combined> = {},
	): void {
		// Get existed query params from URL
		const queryParamsFromUrl = AnimeQueryParamsUrlMapper.fromUrlDto(
			this.removeNullFields(this.activatedRoute.snapshot.queryParams) as AnimeQueryParamsUrlDto.Combined,
			DEFAULT_PAGE_NUMBER,
			DEFAULT_PAGE_SIZE,
		);

		const queryParams = { ...{ ...queryParamsFromUrl, ...params }, ...resetParams };
		const queryParamsToUrlDto = AnimeQueryParamsUrlMapper.toUrlDto(queryParams, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);

		this.queryParamsService.append(queryParamsToUrlDto);
	}
}
