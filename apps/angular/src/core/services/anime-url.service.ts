import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '@js-camp/angular/core/services/url.service';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { HttpParams } from '@angular/common/http';
import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime-filter-params.mapper';
import { AnimeQueryParams } from '@js-camp/core/namespaces/anime-query-params';

/** Anime url service. */
@Injectable({ providedIn: 'root' })
export class AnimeUrlService extends UrlService {
	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly queryParamsService = inject(QueryParamsService);

	/**
	 * Create anime http params.
	 * @param filterParams Filter params.
	 */
	public createAnimeHttpParams(filterParams: AnimeFilterParams.Combined): HttpParams {
		const filterParamsDto = AnimeFilterParamsMapper.toDto(filterParams, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
		return super.createHttpParams(filterParamsDto);
	}

	/**
	 * Updates the URL query params.
	 * @param filterParams Anime filter params.
	 */
	public updateQueryParams(filterParams: Partial<AnimeFilterParams.Combined>): void {
		const existedFilterParams = AnimeQueryParamsMapper.fromDto(
			super.removeNullFields(this.activatedRoute.snapshot.queryParams) as AnimeQueryParams.Combined,
			DEFAULT_PAGE_NUMBER,
			DEFAULT_PAGE_SIZE,
		);

		const newFilterParams = { ...existedFilterParams, ...filterParams };
		const queryParams = AnimeQueryParamsMapper.toDto(newFilterParams, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);

		this.queryParamsService.append(queryParams);
	}
}
