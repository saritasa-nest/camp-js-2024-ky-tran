import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeQueryParamsUrlDto } from '@js-camp/core/dtos/anime-query-params-url.dto';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeQueryParamsUrlMapper } from '@js-camp/core/mappers/anime-query-params-url.mapper';

/** Query params token. */
export const QUERY_PARAMS_TOKEN = new InjectionToken<Observable<AnimeFilterParams.Combined>>('QUERY_PRAMS_TOKEN');

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
 * @param activatedRoute Activated route.
 */
function queryParamsFactory(activatedRoute: ActivatedRoute): Observable<AnimeFilterParams.Combined> {
	return activatedRoute.queryParams.pipe(
		map((params: AnimeQueryParamsUrlDto.Combined | Partial<AnimeQueryParamsUrlDto.Combined>) =>
			AnimeQueryParamsUrlMapper.fromUrlDto(params as AnimeQueryParamsUrlDto.Combined, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE)),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);
}
