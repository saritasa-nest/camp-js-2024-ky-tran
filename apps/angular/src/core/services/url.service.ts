import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { QueryParams } from '@js-camp/core/models/query-params.model';
import { QueryParamsMapper } from '@js-camp/angular/core/mappers/query-params.mapper';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';

/** Url Service. */
@Injectable({ providedIn: 'root' })
export class UrlService {
	private readonly queryParamsMapper = inject(QueryParamsMapper);

	private readonly queryParamsService = inject(QueryParamsService);

	/**
	 * Create Http query params.
	 * @param params - Query params.
	 */
	public createHttpQueryParams(params: QueryParams): HttpParams {
		const paramsDto = this.queryParamsMapper.toDto(params);

		return Object.entries(paramsDto).reduce((httpPrams, [key, value]) =>
			value != null ? httpPrams.set(key, value.toString()) : httpPrams
		, new HttpParams());
	}

	/**
	 * Updates the URL query params.
	 * @param params - The provided query params.
	 */
	public updateQueryParams(params: Partial<QueryParams>): void {
		this.queryParamsService.append(this.queryParamsMapper.toUrlDto(params));
	}
}
