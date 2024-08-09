import { inject, InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

import { AnimeQueryParams } from '@js-camp/core/models/anime-query-params.model';
import { AnimeQueryParamsUrlDto } from '@js-camp/core/dtos/anime-query-params-url.dto';
import { AnimeQueryParamsUrlMapper } from '@js-camp/core/mappers/anime-query-params-url.mapper';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';

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
 * @param activatedRoute Activated route.
 */
function queryParamsFactory(activatedRoute: ActivatedRoute): Observable<AnimeQueryParams.Combined> {

	const animeQueryParamsUrlMapper = inject(AnimeQueryParamsUrlMapper);

	return activatedRoute.queryParams.pipe(
		map((params: AnimeQueryParamsUrlDto.Combined | Partial<AnimeQueryParamsUrlDto.Combined>) =>
			animeQueryParamsUrlMapper.fromUrlDto(
				params as AnimeQueryParamsUrlDto.Combined,
				DEFAULT_PAGE_NUMBER,
				DEFAULT_PAGE_SIZE,
			)),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);
}
