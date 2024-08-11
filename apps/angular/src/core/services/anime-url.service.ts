import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '@js-camp/angular/core/services/url.service';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeQueryParamsDto } from '@js-camp/core/dtos/anime-query-params.dto';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { HttpParams } from '@angular/common/http';
import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime-filter-params.mapper';

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
		const paramsDto = AnimeFilterParamsMapper.toDto(params, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
		return super.createHttpQueryParams(paramsDto);
	}

	/**
	 * Updates the URL query params.
	 * @param params The provided query params.
	 */
	public updateQueryParams(params: Partial<AnimeFilterParams.Combined>): void {
		// Get existed query params
		const queryParamsFromUrl = AnimeQueryParamsMapper.fromDto(
			super.removeNullFields(this.activatedRoute.snapshot.queryParams) as AnimeQueryParamsDto.Combined,
			DEFAULT_PAGE_NUMBER,
			DEFAULT_PAGE_SIZE,
		);

		const queryParams = { ...queryParamsFromUrl, ...params };
		const queryParamsToUrlDto = AnimeQueryParamsMapper.toDto(queryParams, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);

		this.queryParamsService.append(queryParamsToUrlDto);
	}
}
