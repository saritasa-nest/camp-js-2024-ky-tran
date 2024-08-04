import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';

import { Anime } from '@js-camp/core/models/anime.model';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { ErrorMessageComponent } from '@js-camp/angular/shared/components/error-message/error-message.component';
import { TableGeneric } from '@js-camp/angular/core/types/table-generic.type';
import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns.enum';
import { DATE_FORMAT, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';

const tableGeneric: TableGeneric = { columnKeys: AnimeTableColumns };

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
		ErrorMessageComponent,
		NullablePipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements AfterViewInit, OnChanges {
	@ViewChild(MatSort) private readonly sort!: MatSort;

	/** Anime list. */
	@Input({ required: true }) public animeList: readonly Anime[] = [];

	/** Loading status of fetching anime list. */
	@Input({ required: true }) public isLoading: boolean | null = null;

	/** Error message if something went wrong fetching anime list. */
	@Input({ required: true }) public error: string | null = null;

	/** Sort change event emitter. */
	@Output() public readonly sortChange = new EventEmitter<Sort>();

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	/** Convert the list to MatTableDataSource to use MatSort. */
	protected readonly dataSource = new MatTableDataSource<Anime>();

	/** The zero-based page index of the displayed list of items. */
	protected readonly pageIndex$ = new BehaviorSubject<number>(DEFAULT_PAGE_NUMBER - 1);

	/** Number of items to display on a page. */
	protected readonly pageSize$ = new BehaviorSubject<number>(DEFAULT_PAGE_SIZE);

	/** Anime table column names. */
	protected readonly animeColumns = tableGeneric.columnKeys;

	/** Column titles of the table. */
	protected readonly displayedColumns = Object.values(this.animeColumns);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	public constructor() {
		this.queryParamsProvider$.pipe().subscribe(params => {
			const { pageNumber, pageSize } = params;

			if (pageNumber) {
				this.pageIndex$.next(pageNumber - 1);
			}

			if (pageSize) {
				this.pageSize$.next(pageSize);
			}
		});
	}

	/** After View Init. */
	public ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	/** On Changes.
	 * @param changes - SimpleChanges.
	 */
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['animeList']) {
			this.dataSource.data = [...this.animeList];
		}
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
