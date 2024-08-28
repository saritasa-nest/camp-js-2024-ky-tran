import { booleanAttribute, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, inject, Input, numberAttribute, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { BehaviorSubject, ignoreElements, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DATE_FORMAT, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { Anime } from '@js-camp/core/models/anime';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { FILTER_PARAMS_TOKEN } from '@js-camp/angular/core/providers/filter-params.provider';
import { paginatorAttribute } from '@js-camp/angular/shared/attributes/paginator-attribute';
import { animeListAttribute } from '@js-camp/angular/shared/attributes/anime-list-attribute';
import { LazyLoadImageDirective } from '@js-camp/angular/shared/directives/lazy-load-image.directive';
import { BaseFilterParams } from '@js-camp/core/models/base-filter-params';
import { SkeletonCellComponent } from '@js-camp/angular/app/features/home/anime-table/skeleton-cell/skeleton-cell.component';
import { NonNullableFields } from '@js-camp/core/types/non-nullable-fields';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { PaginatorComponent } from '@js-camp/angular/app/features/home/anime-table/paginator/paginator.component';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { SortFields } from '@js-camp/core/models/sort-fields';
import { SortEventDirection } from '@js-camp/angular/core/enums/sort-event-direction';
import { AnimeTableColumns } from '@js-camp/angular/core/enums/anime-table-columns';
import { PATHS } from '@js-camp/core/utils/paths';

/** Anime Table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		NullablePipe,
		LazyLoadImageDirective,
		SkeletonCellComponent,
		PaginatorComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {
	/** Anime table reference. */
	@ViewChild('table', { read: ElementRef }) private readonly animeTableRef!: ElementRef<HTMLElement>;

	/** Anime list. */
	@Input({ required: true, transform: animeListAttribute })
	protected set animeList(values: readonly Anime[]) {
		this.dataSource.data = [...values];
	}

	/** Anime list total. */
	@Input({ required: true, transform: numberAttribute })
	protected readonly animeListTotal = 0;

	/** Loading status of fetching anime list. */
	@Input({ required: true, transform: booleanAttribute })
	protected readonly isLoading = false;

	/**
	 * Page paginator to store page index and page number.
	 * Property - pageNumber: Will be converted to the zero-based page index of the displayed list of items.
	 * Property - pageSize: Number of items to display on a page.
	 */
	@Input({ required: true, transform: paginatorAttribute })
	protected readonly pagePaginator: NonNullableFields<BaseFilterParams.Paginator> | null = null;

	/** Page change event emitter. */
	@Output()
	public readonly pageChange = new EventEmitter<BaseFilterParams.Paginator>();

	/** Sort change event emitter. */
	@Output()
	public readonly sortChange = new EventEmitter<AnimeFilterParams.Sort>();

	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	private readonly filterParamsProvider$ = inject(FILTER_PARAMS_TOKEN);

	/** Convert the list to MatTableDataSource to use MatSort. */
	protected readonly dataSource = new MatTableDataSource<Anime>();

	/**
	 * Page sorter to store sort field and sort direction dto.
	 * Property - active: Sort field.
	 * Property - direction: Sort direction.
	 */
	protected readonly pageSorter$ = new BehaviorSubject<Sort>({ active: '', direction: '' });

	/** A skeleton template for a table while loading. */
	protected readonly skeletonAnimeSource$ = new BehaviorSubject<Anime[]>(
		this.createSkeletonAnimeSource(DEFAULT_PAGE_SIZE),
	);

	/** Anime table column names. */
	protected readonly animeColumns = AnimeTableColumns;

	/** Column titles of the table. */
	protected readonly displayedColumns = Object.values(this.animeColumns);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** @inheritdoc */
	public ngOnInit(): void {
		this.filterParamsProvider$
			.pipe(
				tap(({ pageSize, sortField, sortDirection }) => {
					this.pageSorter$.next(this.matSortEventToTable({ sortField, sortDirection }));
					this.skeletonAnimeSource$.next(this.createSkeletonAnimeSource(pageSize ?? DEFAULT_PAGE_SIZE));
					this.scrollIntoView();
				}),
				ignoreElements(),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	private scrollIntoView(): void {
		if (this.animeTableRef) {
			this.animeTableRef.nativeElement.scrollIntoView({ block: 'start' });
		}
	}

	/**
	 * Page change handler.
	 * @param paginator Page event.
	 */
	protected onPageChange(paginator: BaseFilterParams.Paginator): void {
		this.pageChange.emit(paginator);
	}

	private matSortEventFromTable({ active, direction }: Sort): AnimeFilterParams.Sort {
		let sortDirection: SortDirection | '' = '';

		if (direction === SortEventDirection.Ascending) {
			sortDirection = SortDirection.Ascending;
		}
		if (direction === SortEventDirection.Descending) {
			sortDirection = SortDirection.Descending;
		}

		return {
			sortField: sortDirection !== '' ? active as SortFields : null,
			sortDirection: sortDirection !== '' ? sortDirection : null,
		};
	}

	private matSortEventToTable({ sortField, sortDirection }: AnimeFilterParams.Sort): Sort {
		let direction: SortEventDirection | '' = '';

		if (sortDirection === SortDirection.Ascending) {
			direction = SortEventDirection.Ascending;
		}
		if (sortDirection === SortDirection.Descending) {
			direction = SortEventDirection.Descending;
		}

		return { active: sortField ?? '', direction };
	}

	/**
	 * Sort change event handler.
	 * @param sortEvent Sort event.
	 */
	protected onSortChange(sortEvent: Sort): void {
		this.sortChange.emit(this.matSortEventFromTable(sortEvent));
	}

	/**
	 * Calculate the order of a table row.
	 * @param rowIndex The index of a table row.
	 */
	protected rowOrder(rowIndex: number): number | null {
		return this.pagePaginator ? (this.pagePaginator.pageNumber - 1) * this.pagePaginator.pageSize + rowIndex + 1 : null;
	}

	/**
	 * Get description of an anime image.
	 * @param anime Anime.
	 */
	protected animeImageDescription({ japaneseTitle, englishTitle }: Anime): string {
		return japaneseTitle ?? englishTitle ?? 'Anime image';
	}

	/**
	 * Tracks anime by its unique identifier.
	 * @param _ The index of the anime in the list.
	 * @param anime The anime object.
	 */
	protected trackAnimeById(_: number, anime: Anime): Anime['id'] {
		return anime.id;
	}

	/**
	 * Create a skeleton template for a table while loading.
	 * @param pageSize Page size.
	 */
	protected createSkeletonAnimeSource(pageSize: number): Anime[] {
		// 'as Anime' -> only need id for trackBy function works, all the field with no value will be replaced by skeleton loading
		return Array.from({ length: pageSize }).map((_, index) => ({ id: index } as Anime));
	}

	/**
	 * Navigate to the details page of the selected anime.
	 * @param anime Anime.
	 */
	protected onSelectAnime(anime: Anime): void {
		this.router.navigate([PATHS.animeDetails(anime.id)]);
	}

	/**
	 * Navigate to the details page of the selected anime by pressing Enter button.
	 * @param event Keyboard event.
	 * @param anime Anime.
	 */
	protected onSelectAnimeByKeyDown(event: KeyboardEvent, anime: Anime): void {
		if (event.key === 'Enter') {
			this.onSelectAnime(anime);
		}
	}
}
