import { inject, InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

import { QueryParamsMapper } from '@js-camp/angular/core/mappers/query-params.mapper';
import { QueryParamsUrlDto } from '@js-camp/core/dtos/query-params.dto';
import { AnimeQueryParams } from '@js-camp/core/models/anime-query-params.model';

/** Query params token. */
export const QUERY_PARAMS_TOKEN = new InjectionToken<Observable<AnimeQueryParams.Combined>>('QUERY_PRAMS_TOKEN');

/** Query params provider. */
export const QUERY_PARAMS_PROVIDER: readonly Provider[] = [
	{
		provide: QUERY_PARAMS_TOKEN,
		deps: [ActivatedRoute],
		useFactory: queryParamsFactory,
	},
];

/**
 * Query params factory.
 * @param activatedRoute - Activated route.
 */
function queryParamsFactory(activatedRoute: ActivatedRoute): Observable<AnimeQueryParams.Combined> {
	const queryParamsMapper = inject(QueryParamsMapper);

	return activatedRoute.queryParams.pipe(
		map((params: QueryParamsUrlDto | Partial<QueryParamsUrlDto>) => queryParamsMapper.fromUrlDto(params)),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);
}
