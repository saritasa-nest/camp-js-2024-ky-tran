import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

import { QueryParams, QueryParamsSort } from '@js-camp/core/models/query-params.model';
import { QueryParamsMapper } from '@js-camp/angular/core/mappers/query-params.mapper';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';
import { SortFields } from '@js-camp/core/models/sort-fields.model';
import { SortEventDto } from '@js-camp/core/dtos/sort-event.dto';

/** Url Service. */
@Injectable({ providedIn: 'root' })
export class UrlService {
	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly queryParamsMapper = inject(QueryParamsMapper);

	private readonly queryParamsService = inject(QueryParamsService);

	private removeNullFields<O extends { [key: string]: unknown; }>(obj: O): Partial<O> {
		return Object.fromEntries(Object.entries(obj).filter(
			([_, value]) => value !== null,
		)) as Partial<O>;
	}

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
	 * Prepare sort change data from table.
	 * @param sortEvent - Sort event.
	 */
	public prepareSortChangeFromTable(sortEvent: Sort): QueryParamsSort {
		return this.queryParamsMapper.sortEventFromDto({
			active: sortEvent.active as SortFields,
			direction: sortEvent.direction,
		});
	}

	/**
	 * Prepare sort change data to table.
	 * @param sortData - Sort data.
	 */
	public prepareSortChangeToTable(sortData: QueryParamsSort): SortEventDto {
		return this.queryParamsMapper.sortEventToDto(sortData);
	}

	/**
	 * Updates the URL query params.
	 * @param params - The provided query params.
	 * @param resetParams The provided reset params.
	 */
	public updateQueryParams(params: Partial<QueryParams>, resetParams?: Partial<QueryParams>): void {
		const queryParams =	this.removeNullFields({ ...this.activatedRoute.snapshot.queryParams, ...params });
		const queryParamsToUrlDto = this.queryParamsMapper.toUrlDto(queryParams);

		if (resetParams == null) {
			this.queryParamsService.append(queryParamsToUrlDto);
		} else {
			this.queryParamsService.appendAndReset(queryParamsToUrlDto, resetParams);
		}
	}
}
