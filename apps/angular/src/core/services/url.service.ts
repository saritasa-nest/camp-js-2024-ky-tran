import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UpdateQueryParamsType } from '@js-camp/core/enums/update-query-params-type';
import { QueryParams } from '@js-camp/core/models/query-params';
import { QueryParamsMapper } from '@js-camp/angular/core/mappers/query-params';
import { map, Observable } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeType } from '@js-camp/core/models/anime';
import { QueryParamsDto } from '@js-camp/core/dtos/query-params';
import { HttpParams } from '@angular/common/http';

/** Url Service. */
@Injectable({ providedIn: 'root' })
export class UrlService {
	private readonly router = inject(Router);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly queryParamsMapper = inject(QueryParamsMapper);

	private removeUndefinedFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
		return Object.fromEntries(
			Object.entries(obj).filter(([_, value]) => value != null),
		) as Partial<T>;
	}

	/** Get query params from URL. */
	public getQueryParams(): Observable<Partial<QueryParams>> {
		return this.activatedRoute.queryParamMap.pipe(
			map(params => {
				const newParams: Partial<QueryParams> = {
					pageNumber: Number(params.get('pageNumber')) || 1,
					pageSize: Number(params.get('pageSize')) || DEFAULT_PAGE_SIZE,
					sortFields: params.has('sortFields') ? params.getAll('sortFields') : undefined,
					type: params.has('type') ? params.get('type') as AnimeType : undefined,
					search: params.has('search') ? params.get('search') : undefined,
				};

				return this.removeUndefinedFields(newParams);
			}),
		);
	}

	private getQueryParamsDto(queryPrams: Partial<QueryParams>): Partial<QueryParamsDto> {
		return this.removeUndefinedFields(
			this.queryParamsMapper.toDto(queryPrams as QueryParams),
		);
	}

	/** Create Http query params for pagination, sort, filter and search. */
	public createHttpQueryParams(): Observable<HttpParams> {
		return this.getQueryParams().pipe(
			map(queryParams => {
				const queryPramsDto = this.getQueryParamsDto(queryParams);

				return Object.entries(queryPramsDto).reduce((httpPrams, [key, value]) =>
					value != null ? httpPrams.set(key, value.toString()) : httpPrams
				, new HttpParams());
			}),
		);
	}

	/**
	 * Updates the URL query parameters based on the provided type and options.
	 *
	 * @param type - The type of URL parameter to update (e.g., Paginator, Sort, Filter, Search).
	 * @param options - The options containing the new values for the query parameters.
	 */
	public updateQueryParams(type: UpdateQueryParamsType, options: Partial<QueryParams>): void {
		const currentParams = this.activatedRoute.snapshot.queryParams as QueryParams;
		const { pageNumber, pageSize } = options;
		let newParams: Partial<QueryParams> = {};

		if (type === UpdateQueryParamsType.Paginator && pageNumber != null && pageSize != null) {
			newParams = { pageNumber, pageSize };
		}

		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { ...currentParams, ...newParams },
			queryParamsHandling: 'merge',
		});
	}
}
