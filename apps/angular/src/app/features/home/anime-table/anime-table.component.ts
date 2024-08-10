import { booleanAttribute, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, tap } from 'rxjs';
import { DATE_FORMAT, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { Anime } from '@js-camp/core/models/anime';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns.enum';
import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { SortEventDto, SortEventFieldsDto } from '@js-camp/core/dtos/sort-event.dto';
import { paginatorAttribute } from '@js-camp/angular/shared/attributes/paginator-attribute';
import { emptyStringAttribute } from '@js-camp/angular/shared/attributes/empty-string-attribute';
import { animeListAttribute } from '@js-camp/angular/shared/attributes/anime-list-attribute';
import { SnackbarComponent } from '@js-camp/angular/shared/components/error-snack-bar/error-snack-bar.component';
import { LazyLoadImageDirective } from '@js-camp/angular/shared/directives/lazy-load-image.directive';
import { BaseQueryParams } from '@js-camp/core/models/base-query-params';
import { SkeletonCellComponent } from '@js-camp/angular/app/features/home/anime-table/skeleton-cell/skeleton-cell.component';
import { NonNullableFields } from '@js-camp/core/types/non-nullable-fields';
import { SortEventMapper } from '@js-camp/core/mappers/sort-event.mapper';
import { AnimeQueryParams } from '@js-camp/core/models/anime-query-params';

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
		ProgressSpinnerComponent,
		NullablePipe,
		LazyLoadImageDirective,
		SkeletonCellComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {
	/** Anime list. */
	@Input({ required: true, transform: animeListAttribute })
	public set animeList(values: readonly Anime[]) {
		this.dataSource.data = [...values];
	}

	/** Loading status of fetching anime list. */
	@Input({ required: true, transform: booleanAttribute })
	public isLoading = false;

	/** Error message if something went wrong fetching anime list. */
	@Input({ required: true, transform: emptyStringAttribute })
	public set error(value: string) {
		if (value !== '') {
			this.snackBar.openFromComponent(SnackbarComponent, {
				verticalPosition: 'top',
				horizontalPosition: 'right',
				data: { errorMessage: value },
			});
		}
	}

	/**
	 * Page paginator to store page index and page number.
	 * Property - pageNumber: Will be converted to the zero-based page index of the displayed list of items.
	 * Property - pageSize: Number of items to display on a page.
	 */
	@Input({ required: true, transform: paginatorAttribute })
	protected readonly pagePaginator: NonNullableFields<BaseQueryParams.Paginator> | null = null;

	/** Sort change event emitter. */
	@Output()
	public readonly sortChange = new EventEmitter<AnimeQueryParams.Sort>();

	private readonly destroyRef = inject(DestroyRef);

	private readonly snackBar = inject(MatSnackBar);

	/** Convert the list to MatTableDataSource to use MatSort. */
	protected readonly dataSource = new MatTableDataSource<Anime>();

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	/**
	 * Page sorter to store sort field and sort direction dto.
	 * Property - active: Sort field.
	 * Property - direction: Sort direction.
	 */
	protected readonly pageSorter$ = new BehaviorSubject<SortEventDto>({ active: '', direction: '' });

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
		this.queryParamsProvider$
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				tap(({ pageSize, sortField, sortDirection }) => {
					this.pageSorter$.next(SortEventMapper.toDto({ sortField, sortDirection }));
					this.skeletonAnimeSource$.next(this.createSkeletonAnimeSource(pageSize ?? DEFAULT_PAGE_SIZE));
				}),
			)
			.subscribe();
	}

	/**
	 * Sort change event handler.
	 * @param sortEvent Sort event.
	 */
	protected onSortChange({ active, direction }: Sort): void {
		this.sortChange.emit(SortEventMapper.fromDto({ active: active as SortEventFieldsDto, direction }));
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
	protected animeImageDescription(anime: Anime): string {
		return anime.englishTitle ?? anime.japaneseTitle ?? 'Anime image';
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
}
