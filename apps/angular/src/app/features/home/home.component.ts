import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 	BehaviorSubject, catchError, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FILTER_PARAMS_PROVIDER, FILTER_PARAMS_TOKEN } from '@js-camp/angular/core/providers/filter-params.provider';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeTableComponent } from '@js-camp/angular/app/features/home/anime-table/anime-table.component';
import { FilterComponent } from '@js-camp/angular/app/features/home/filter/filter.component';
import { SearchComponent } from '@js-camp/angular/app/features/home/search/search.component';
import { PaginatorComponent } from '@js-camp/angular/app/features/home/paginator/paginator.component';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeUrlService } from '@js-camp/angular/core/services/anime-url.service';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { toggleExecutionState } from '@js-camp/angular/shared/utils/rxjs/toggleExecutionState';
import { BaseFilterParams } from '@js-camp/core/models/base-filter-params';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [CommonModule, AnimeTableComponent, FilterComponent, SearchComponent, PaginatorComponent],
	providers: [...FILTER_PARAMS_PROVIDER],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
	private readonly animeService = inject(AnimeService);

	private readonly animeUrlService = inject(AnimeUrlService);

	private readonly filterParamsProvider$ = inject(FILTER_PARAMS_TOKEN);

	private readonly destroyRef = inject(DestroyRef);

	/** Stream of anime list. */
	protected readonly animeList$ = new BehaviorSubject<Pagination<Anime> | null>(null);

	/** Loading status of fetching anime list. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/** Error message if something went wrong fetching anime list. */
	protected readonly error$ = new BehaviorSubject('');

	/**
	 * Page paginator to store page index and page number.
	 * Page index: The zero-based page index of the displayed list of items.
	 * Page number: Number of items to display on a page.
	 */
	protected readonly pagePaginator$ = new BehaviorSubject<BaseFilterParams.Paginator>({
		pageNumber: DEFAULT_PAGE_NUMBER,
		pageSize: DEFAULT_PAGE_SIZE,
	});

	/** @inheritdoc */
	public ngOnInit(): void {
		this.filterParamsProvider$
			.pipe(
				tap(filterParams => this.pagePaginator$.next({ pageNumber: filterParams.pageNumber, pageSize: filterParams.pageSize })),
				switchMap(filterParams => this.animeService.getAnimeList(filterParams).pipe(
					toggleExecutionState(this.isLoading$),
					catchError((error: unknown) => throwError(() => {
						const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
						this.error$.next(errorMessage);
						return error;
					})),
				)),
				shareReplay({ refCount: true, bufferSize: 1 }),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(result => this.animeList$.next(result));
	}

	/**
	 * Page change handler.
	 * @param paginator Page event.
	 */
	protected onPageChange(paginator: BaseFilterParams.Paginator): void {
		this.animeUrlService.updateQueryParams(paginator);
	}

	/**
	 * Sort change handler.
	 * @param sortFilterParams Sort filter params.
	 */
	protected onSortChange(sortFilterParams: AnimeFilterParams.Sort): void {
		this.animeUrlService.updateQueryParams({ ...sortFilterParams, pageNumber: DEFAULT_PAGE_NUMBER });
	}

	/**
	 * Selection change handler.
	 * @param selectFilterParams Select filter params.
	 */
	protected onSelectionChange(selectFilterParams: AnimeFilterParams.Filter): void {
		this.animeUrlService.updateQueryParams({ ...selectFilterParams, pageNumber: DEFAULT_PAGE_NUMBER });
	}

	/**
	 * Search change handler.
	 * @param search Search query.
	 */
	protected onSearchChange(search: string | null): void {
		this.animeUrlService.updateQueryParams({ search, pageNumber: DEFAULT_PAGE_NUMBER });
	}
}
