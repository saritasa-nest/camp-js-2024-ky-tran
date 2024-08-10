import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { 	BehaviorSubject, catchError, Observable,	shareReplay, switchMap, tap, throwError } from 'rxjs';
import { QUERY_PARAMS_PROVIDER, QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
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
import { BaseQueryParams } from '@js-camp/core/models/base-query-params';
import { SortEventMapper } from '@js-camp/core/mappers/sort-event.mapper';
import { SortEventFieldsDto } from '@js-camp/core/dtos/sort-event.dto';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [CommonModule, AnimeTableComponent, FilterComponent, SearchComponent, PaginatorComponent],
	providers: [...QUERY_PARAMS_PROVIDER],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly animeService = inject(AnimeService);

	private readonly animeUrlService = inject(AnimeUrlService);

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	/** Stream of anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Loading status of fetching anime list. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/** Error message if something went wrong fetching anime list. */
	protected readonly error$ = new BehaviorSubject('');

	/**
	 * Page paginator to store page index and page number.
	 * Page index: The zero-based page index of the displayed list of items.
	 * Page number: Number of items to display on a page.
	 */
	protected readonly pagePaginator$ = new BehaviorSubject<BaseQueryParams.Paginator>({
		pageNumber: DEFAULT_PAGE_NUMBER,
		pageSize: DEFAULT_PAGE_SIZE,
	});

	// debounceTime(300), throttleTime(500, undefined, { leading: true, trailing: true })
	public constructor() {
		this.animeList$ = this.queryParamsProvider$.pipe(
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
		);
	}

	/**
	 * Page change event handler.
	 * @param pageEvent Page event.
	 */
	protected onPageChange(pageEvent: PageEvent): void {
		const { pageIndex, pageSize } = pageEvent;
		this.animeUrlService.updateQueryParams({ pageNumber: pageIndex + 1, pageSize });
	}

	// TODO (Ky Tran) use FilterParam as arg here
	/**
	 * Sort change event handler.
	 * @param sortEvent Sort event.
	 */
	protected onSortChange(sortEvent: Sort): void {
		this.animeUrlService.updateQueryParams({
			...SortEventMapper.fromDto({ active: sortEvent.active as SortEventFieldsDto, direction: sortEvent.direction }),
			pageNumber: DEFAULT_PAGE_NUMBER,
		});
	}

	// TODO (Ky Tran): Emit FilterParams instead of MatSelect
	/**
	 * Selection change event handler.
	 * @param selectEvent Select Change event.
	 */
	protected onSelectionChange(selectEvent: MatSelectChange): void {
		this.animeUrlService.updateQueryParams({
			type: selectEvent.value ? selectEvent.value : null,
			pageNumber: DEFAULT_PAGE_NUMBER,
		});
	}

	/**
	 * Search change fired when enter is hit to emit search value event.
	 * @param searchTerm Search term.
	 */
	protected onSearchChange(searchTerm: string): void {
		this.animeUrlService.updateQueryParams({
			search: searchTerm ?? null,
			pageNumber: DEFAULT_PAGE_NUMBER,
		});
	}
}
