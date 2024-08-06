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

import { DATE_FORMAT } from '@js-camp/angular/shared/constants';
import { Anime } from '@js-camp/core/models/anime.model';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { TableGeneric } from '@js-camp/angular/core/types/table-generic.type';
import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns.enum';
import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { SortEventDto } from '@js-camp/core/dtos/sort-event.dto';
import { SortFields } from '@js-camp/core/models/sort-fields.model';
import { paginatorAttribute } from '@js-camp/angular/shared/attributes/paginator-attribute';
import { QueryParamsPaginator } from '@js-camp/core/models/query-params.model';
import { emptyStringAttribute } from '@js-camp/angular/shared/attributes/empty-string-attribute';
import { animeListAttribute } from '@js-camp/angular/shared/attributes/anime-list-attribute';
import { UrlService } from '@js-camp/angular/core/services/url.service';
import { SnackbarComponent } from '@js-camp/angular/shared/components/error-snack-bar/error-snack-bar.component';

const tableGeneric: TableGeneric = { columnKeys: AnimeTableColumns };

/** Anime Table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	imports: [CommonModule, AsyncPipe, MatTableModule, MatSortModule, ProgressSpinnerComponent, NullablePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, AfterViewInit, OnChanges {
	@ViewChild(MatSort) private readonly sort!: MatSort;

	/** Anime list. */
	@Input({ required: true, transform: animeListAttribute }) public animeList!: readonly Anime[];

	/** Loading status of fetching anime list. */
	@Input({ required: true, transform: booleanAttribute }) public isLoading!: boolean;

	/** Error message if something went wrong fetching anime list. */
	@Input({ required: true, transform: emptyStringAttribute }) public error!: string;

	/**
	 * Page paginator to store page index and page number.
	 * Page index: The zero-based page index of the displayed list of items.
	 * Page number: Number of items to display on a page.
	 */
	@Input({ required: true, transform: paginatorAttribute }) protected readonly pagePaginator!: QueryParamsPaginator;

	/** Sort change event emitter. */
	@Output() public readonly sortChange = new EventEmitter<Sort>();

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	private readonly destroyRef = inject(DestroyRef);

	private readonly urlService = inject(UrlService);

	private readonly snackBar = inject(MatSnackBar);

	/** Convert the list to MatTableDataSource to use MatSort. */
	protected readonly dataSource = new MatTableDataSource<Anime>();

	/**
	 * Page paginator to store page index and page number.
	 * Page index: The zero-based page index of the displayed list of items.
	 * Page number: Number of items to display on a page.
	 */
	protected readonly pageSorter$ = new BehaviorSubject<SortEventDto>({ active: '' as SortFields, direction: '' });

	/** Anime table column names. */
	protected readonly animeColumns = tableGeneric.columnKeys;

	/** Column titles of the table. */
	protected readonly displayedColumns = Object.values(this.animeColumns);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** On Init. */
	public ngOnInit(): void {
		this.queryParamsProvider$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ sortField, sortDirection }) => {
			const { active, direction } = this.urlService.prepareSortChangeToTable({ sortField, sortDirection });
			this.pageSorter$.next({ active, direction });
		});
	}

	/** On Changes.
	 * @param changes - SimpleChanges.
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
	 * @param sortEvent - Sort event.
	 */
	protected onSortChange(sortEvent: Sort): void {
		this.sortChange.emit(sortEvent);
	}

	/**
	 * Tracks anime by its unique identifier.
	 * @param _ - The index of the anime in the list.
	 * @param anime - The anime object.
	 */
	protected trackAnimeById(_: number, anime: Anime): Anime['id'] {
		return anime.id;
	}
}
