import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UpdateQueryParamsType } from '@js-camp/core/enums/update-query-params-type';
import { QueryParams } from '@js-camp/core/models/query-params';

/** Url Service. */
@Injectable({ providedIn: 'root' })
export class UrlService {
	private readonly router = inject(Router);

	private readonly activatedRoute = inject(ActivatedRoute);

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
