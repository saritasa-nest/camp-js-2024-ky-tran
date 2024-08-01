import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QueryParams } from '@js-camp/core/models/query-params';
import { UpdateUrlParamsType } from '@js-camp/core/enums/update-url-params-type';
import { UpdateUrlParamsOptions } from '@js-camp/core/types/update-url-params-options';

/** Url Service. */
@Injectable({ providedIn: 'root' })
export class UrlService {
	private readonly router = inject(Router);

	private activatedRoute = inject(ActivatedRoute);

	/**
	 * Updates the URL query parameters based on the provided type and options.
	 *
	 * @param type - The type of URL parameter to update (e.g., Paginator, Sort, Filter, Search) {@link UpdateUrlParamsType}.
	 * @param options - The options containing the new values for the query parameters {@link Partial<UpdateUrlParamsOptions>}.
	 */
	public updateParams(type: UpdateUrlParamsType, options: Partial<UpdateUrlParamsOptions>): void {
		const currentParams = this.activatedRoute.snapshot.queryParams as QueryParams;

		let newParams: Partial<QueryParams> = {};
		const { paginator } = options;

		if (type === UpdateUrlParamsType.Paginator && paginator != null) {
			newParams = paginator;
		}

		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { ...currentParams, ...newParams },
			queryParamsHandling: 'merge',
		});
	}
}
