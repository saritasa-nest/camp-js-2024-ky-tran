import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** Query Params service. */
@Injectable({ providedIn: 'root' })
export class QueryParamsService {
	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	/**
	 * Get query with given key.
	 * @param key Query param key.
	 */
	public get(key: string): string | null {
		return this.activatedRoute.snapshot.queryParamMap.get(key);
	}

	/**
	 * Merge provided query params to the URL.
	 * @param queryParams The provided query params.
	 */
	public append(queryParams: Record<string, unknown>): void {
		this.router.navigate([], { queryParams, relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
	}

	/**
	 * Remove provided query params from the URL.
	 * @param removedQueryParams The provided query params.
	 */
	public remove(removedQueryParams: Record<string, unknown>): void {
		const queryParams = Object.keys(removedQueryParams).reduce((acc, key) => {
			acc[key] = null;
			return acc;
		}, {} as Record<string, null>);

		this.append(queryParams);
	}

	/** Reset query params. */
	public resetAll(): void {
		this.router.navigate([], { queryParams: null, relativeTo: this.activatedRoute });
	}
}
