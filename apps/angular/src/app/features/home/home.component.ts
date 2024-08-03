import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, catchError, Observable, shareReplay, Subject, switchMap, take, throwError } from 'rxjs';

import { AnimeTableComponent } from '@js-camp/angular/app/features/home/anime-table/anime-table.component';
import { PaginatorComponent } from '@js-camp/angular/app/features/home/paginator/paginator.component';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { UrlService } from '@js-camp/angular/core/services/url.service';
import { Anime } from '@js-camp/core/models/anime.model';
import { Pagination } from '@js-camp/core/models/pagination.model';
import { toggleExecutionState } from '@js-camp/angular/shared/utils/rxjs/toggleExecutionState';
import { UpdateQueryParamsType } from '@js-camp/core/enums/update-query-params-type.enum';
import { PaginatorQueryParams, QueryParams } from '@js-camp/core/models/query-params.model';
import { DEFAULT_PAGE_NUMBER } from '@js-camp/angular/shared/constants';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [CommonModule, AnimeTableComponent, PaginatorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly animeService = inject(AnimeService);

	private readonly urlService = inject(UrlService);

	/** Stream of anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Loading status of fetching anime list. */
	protected readonly isLoading$ = new Subject<boolean>();

	/** Error message if something went wrong fetching anime list. */
	protected readonly error$ = new BehaviorSubject<string>('');

	/** Initial paginator query params. */
	protected readonly initialPaginatorQueryParams$: Observable<Pick<QueryParams, 'pageNumber' | 'pageSize'>>;

	/** Paginator query params. */
	protected readonly paginatorQueryParams$: Observable<Pick<QueryParams, 'pageNumber' | 'pageSize'>>;

	/** Default page number. */
	protected readonly defaultPageNumber = DEFAULT_PAGE_NUMBER;

	public constructor() {
		this.animeList$ = this.urlService.createHttpQueryParams().pipe(
			switchMap(httpParams => this.animeService.getAll(httpParams).pipe(
				toggleExecutionState(this.isLoading$),
				catchError((error: unknown) => throwError(() => {
					const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
					this.error$.next(errorMessage);
					return error;
				})),
			)),
		);

		this.paginatorQueryParams$ = this.urlService.getQueryParams() as Observable<PaginatorQueryParams>;

		this.initialPaginatorQueryParams$ = this.urlService.getQueryParams()
			.pipe(
				take(1),
				shareReplay({ bufferSize: 1, refCount: true }),
			) as Observable<PaginatorQueryParams>;
	}

	/**
	 * Page change event handler.
	 * @param pageEvent Page event.
	 */
	protected onPageChange(pageEvent: PageEvent): void {
		this.urlService.updateQueryParams(UpdateQueryParamsType.Paginator, {
			pageNumber: pageEvent.pageIndex + 1,
			pageSize: pageEvent.pageSize,
		});
	}
}
