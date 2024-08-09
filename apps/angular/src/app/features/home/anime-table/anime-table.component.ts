import {
	AfterViewInit,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	EventEmitter,
	inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';

import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

import { DATE_FORMAT, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { Anime } from '@js-camp/core/models/anime.model';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns.enum';
import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { SortEventDto } from '@js-camp/core/dtos/sort-event.dto';
import { paginatorAttribute } from '@js-camp/angular/shared/attributes/paginator-attribute';
import { emptyStringAttribute } from '@js-camp/angular/shared/attributes/empty-string-attribute';
import { animeListAttribute } from '@js-camp/angular/shared/attributes/anime-list-attribute';
import { UrlService } from '@js-camp/angular/core/services/url.service';
import { SnackbarComponent } from '@js-camp/angular/shared/components/error-snack-bar/error-snack-bar.component';
import { LazyLoadImageDirective } from '@js-camp/angular/shared/directives/lazy-load-image.directive';
import { BaseQueryParams } from '@js-camp/core/models/base-query-params.model';
import { SkeletonCellComponent } from '@js-camp/angular/app/features/home/anime-table/skeleton-cell/skeleton-cell.component';
import { NonNullableFields } from '@js-camp/core/types/non-nullable-fields';

/** Anime Table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	imports: [
		CommonModule,
		AsyncPipe,
		MatTableModule,
		MatSortModule,
		ProgressSpinnerComponent,
		NullablePipe,
		LazyLoadImageDirective,
		SkeletonCellComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, AfterViewInit, OnChanges {
	@ViewChild(MatSort)
	private readonly sort!: MatSort;

	/** Anime list. */
	@Input({ required: true, transform: animeListAttribute })
	public animeList!: readonly Anime[];

	/** Loading status of fetching anime list. */
	@Input({ required: true, transform: booleanAttribute })
	public isLoading!: boolean;

	/** Error message if something went wrong fetching anime list. */
	@Input({ required: true, transform: emptyStringAttribute })
	public error!: string;

	/**
	 * Page paginator to store page index and page number.
	 * Property - pageNumber: Will be converted to the zero-based page index of the displayed list of items.
	 * Property - pageSize: Number of items to display on a page.
	 */
	@Input({ required: true, transform: paginatorAttribute })
	protected readonly pagePaginator!: NonNullableFields<BaseQueryParams.Paginator>;

	/** Sort change event emitter. */
	@Output()
	public readonly sortChange = new EventEmitter<Sort>();

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	private readonly destroyRef = inject(DestroyRef);

	private readonly urlService = inject(UrlService);

	private readonly snackBar = inject(MatSnackBar);

	/** Convert the list to MatTableDataSource to use MatSort. */
	protected readonly dataSource = new MatTableDataSource<Anime>();

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

	/** On Init. */
	public ngOnInit(): void {
		this.queryParamsProvider$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(({ pageSize, sortField, sortDirection }) => {
				this.pageSorter$.next(this.urlService.prepareSortChangeToTable({ sortField, sortDirection }));
				this.skeletonAnimeSource$.next(this.createSkeletonAnimeSource(pageSize ?? DEFAULT_PAGE_SIZE));
			});
	}

	/** On Changes.
	 * @param changes SimpleChanges.
	 */
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['animeList']) {
			this.dataSource.data = [...this.animeList];
		}

		if (changes['error']?.currentValue) {
			this.snackBar.openFromComponent(SnackbarComponent, {
				verticalPosition: 'top',
				horizontalPosition: 'right',
				data: { errorMessage: changes['error'].currentValue },
			});
		}
	}

	/** After View Init. */
	public ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	/**
	 * Sort change event handler.
	 * @param sortEvent Sort event.
	 */
	protected onSortChange(sortEvent: Sort): void {
		this.sortChange.emit(sortEvent);
	}

	/**
	 * Get description of an anime image.
	 * @param anime Anime.
	 */
	protected animeImageDescription(anime: Anime): string {
		return anime.englishTitle ?? anime.japaneseTitle ?? 'Anime image';
	}

	/**
	 * Check if list of anime is empty after fetching data.
	 * @param isLoading Loading status.
	 * @param error Error message.
	 * @param anime List of anime.
	 */
	protected isNoData(isLoading: boolean | null, error: string | null, anime: readonly Anime[]): boolean {
		return isLoading === false && error === '' && anime.length === 0;
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
		// Use 'as Anime' here because we only need id for trackBy function works
		// All the field with no value will be replaced by skeleton loading
		return Array.from({ length: pageSize }).map((_, index) => ({ id: index } as Anime));
	}
}
