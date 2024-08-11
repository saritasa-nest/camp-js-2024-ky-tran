import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeQueryParamsDto } from '@js-camp/core/dtos/anime-query-params.dto';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

/** Filter params token. */
export const FILTER_PARAMS_TOKEN = new InjectionToken<Observable<AnimeFilterParams.Combined>>('FILTER_PRAMS_TOKEN');

/** Query params provider. */
export const FILTER_PARAMS_PROVIDER: readonly Provider[] = [
	{
		provide: FILTER_PARAMS_TOKEN,
		deps: [ActivatedRoute],
		useFactory: filterParamsFactory,
	},
];

/**
 * Filter params factory.
 * @param activatedRoute Activated route.
 */
function filterParamsFactory(activatedRoute: ActivatedRoute): Observable<AnimeFilterParams.Combined> {
	return activatedRoute.queryParams.pipe(
		map((queryParams: AnimeQueryParamsDto.Combined | Partial<AnimeQueryParamsDto.Combined>) =>
			AnimeQueryParamsMapper.fromDto(queryParams as AnimeQueryParamsDto.Combined, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE)),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);
}
