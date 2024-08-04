import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, catchError, map, Observable, Subject, switchMap, throwError } from 'rxjs';

import { AnimeTableComponent } from '@js-camp/angular/app/features/home/anime-table/anime-table.component';
import { PaginatorComponent } from '@js-camp/angular/app/features/home/paginator/paginator.component';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { UrlService } from '@js-camp/angular/core/services/url.service';
import { Anime } from '@js-camp/core/models/anime.model';
import { Pagination } from '@js-camp/core/models/pagination.model';
import { toggleExecutionState } from '@js-camp/angular/shared/utils/rxjs/toggleExecutionState';
import { QUERY_PARAMS_PROVIDER, QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { Sort } from '@angular/material/sort';

// import { PaginatorQueryParams, QueryParams } from '@js-camp/core/models/query-params.model';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [CommonModule, AnimeTableComponent, PaginatorComponent],
	providers: [...QUERY_PARAMS_PROVIDER],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly animeService = inject(AnimeService);

	private readonly urlService = inject(UrlService);

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	/** Stream of anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Loading status of fetching anime list. */
	protected readonly isLoading$ = new Subject<boolean>();

	/** Error message if something went wrong fetching anime list. */
	protected readonly error$ = new BehaviorSubject<string>('');

	public constructor() {
		this.animeList$ = this.queryParamsProvider$.pipe(
			map(params => this.urlService.createHttpQueryParams(params)),
			switchMap(httpParams => this.animeService.getAll(httpParams).pipe(
				toggleExecutionState(this.isLoading$),
				catchError((error: unknown) => throwError(() => {
					const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
					this.error$.next(errorMessage);
					return error;
				})),
			)),
		);
	}

	/**
	 * Page change event handler.
	 * @param pageEvent - Page event.
	 */
	protected onPageChange(pageEvent: PageEvent): void {
		const { pageIndex, pageSize } = pageEvent;
		this.urlService.updateQueryParams({ pageNumber: pageIndex + 1, pageSize });
	}

	/**
	 * Sort change event handler.
	 * @param sortEvent - Sort event.
	 */
	protected onSortChange(sortEvent: Sort): void {
		console.log(sortEvent);
	}
}
