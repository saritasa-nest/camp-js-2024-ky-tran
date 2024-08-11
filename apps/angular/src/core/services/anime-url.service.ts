import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '@js-camp/angular/core/services/url.service';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeQueryParamsUrlDto } from '@js-camp/core/dtos/anime-query-params-url.dto';
import { AnimeQueryParamsUrlMapper } from '@js-camp/core/mappers/anime-query-params-url.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { HttpParams } from '@angular/common/http';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

/** Anime url service. */
@Injectable({ providedIn: 'root' })
export class AnimeUrlService extends UrlService {
	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly queryParamsService = inject(QueryParamsService);

	/**
	 * Create Http query params.
	 * @param params Query params.
	 */
	public createHttpAnimeQueryParams(params: AnimeFilterParams.Combined): HttpParams {
		const paramsDto = AnimeQueryParamsMapper.toDto(params, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
		return super.createHttpQueryParams(paramsDto);
	}

	/**
	 * Updates the URL query params.
	 * @param params The provided query params.
	 */
	public updateQueryParams(params: Partial<AnimeFilterParams.Combined>): void {
		// Get existed query params
		const queryParamsFromUrl = AnimeQueryParamsUrlMapper.fromUrlDto(
			super.removeNullFields(this.activatedRoute.snapshot.queryParams) as AnimeQueryParamsUrlDto.Combined,
			DEFAULT_PAGE_NUMBER,
			DEFAULT_PAGE_SIZE,
		);

		const queryParams = { ...queryParamsFromUrl, ...params };
		const queryParamsToUrlDto = AnimeQueryParamsUrlMapper.toUrlDto(queryParams, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);

		this.queryParamsService.append(queryParamsToUrlDto);
	}
}
