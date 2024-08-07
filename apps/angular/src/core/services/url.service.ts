import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

import { AnimeQueryParams } from '@js-camp/core/models/anime-query-params.model';
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
		return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null)) as Partial<O>;
	}

	/**
	 * Create Http query params.
	 * @param params - Query params.
	 */
	public createHttpQueryParams(params: AnimeQueryParams.Combined): HttpParams {
		const paramsDto = this.queryParamsMapper.toDto(params);

		return Object.entries(paramsDto).reduce((httpPrams, [key, value]) =>
			value != null ? httpPrams.set(key, value.toString()) : httpPrams
		, new HttpParams());
	}

	/**
	 * Prepare sort change data from table.
	 * @param sortEvent - Sort event.
	 */
	public prepareSortChangeFromTable(sortEvent: Sort): AnimeQueryParams.Sort {
		return this.queryParamsMapper.sortEventFromDto({
			active: sortEvent.active as SortFields,
			direction: sortEvent.direction,
		});
	}

	/**
	 * Prepare sort change data to table.
	 * @param sortData - Sort data.
	 */
	public prepareSortChangeToTable(sortData: AnimeQueryParams.Sort): SortEventDto {
		return this.queryParamsMapper.sortEventToDto(sortData);
	}

	/**
	 * Updates the URL query params.
	 * @param params - The provided query params.
	 * @param resetParams The provided reset params.
	 */
	public updateQueryParams(params: Partial<AnimeQueryParams.Combined>, resetParams: Partial<AnimeQueryParams.Combined> = {}): void {
		const queryParamsFromUrl = this.queryParamsMapper.fromUrlDto(
			this.removeNullFields(this.activatedRoute.snapshot.queryParams),
		);

		const queryParamsToUrlDto = this.queryParamsMapper.toUrlDto({
			...{ ...queryParamsFromUrl, ...this.removeNullFields(params) },
			...resetParams,
		});

		this.queryParamsService.append(queryParamsToUrlDto);
	}
}
