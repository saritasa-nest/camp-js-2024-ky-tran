import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Anime } from '@js-camp/core/models/anime.model';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { ErrorMessageComponent } from '@js-camp/angular/shared/components/error-message/error-message.component';
import { TableGeneric } from '@js-camp/angular/core/types/table-generic.type';
import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns.enum';
import { DATE_FORMAT, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { PaginatorQueryParams } from '@js-camp/core/models/query-params.model';

const tableGeneric: TableGeneric = { columnKeys: AnimeTableColumns };

/** Anime Table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	imports: [CommonModule, AsyncPipe, MatTableModule, ProgressSpinnerComponent, ErrorMessageComponent, NullablePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime list. */
	@Input({ required: true }) public animeList!: readonly Anime[];

	/** Loading status of fetching anime list. */
	@Input({ required: true }) public isLoading: boolean | null = null;

	/** Error message if something went wrong fetching anime list. */
	@Input({ required: true }) public error: string | null = null;

	/** Page query params for calculating the order of anime in table. */
	@Input() public paginatorQueryParams: PaginatorQueryParams | null = null;

	/** Anime table column names. */
	protected readonly animeColumns = tableGeneric.columnKeys;

	/** Column titles of the table. */
	protected readonly displayedColumns = Object.values(this.animeColumns);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	public constructor() {
		if (this.paginatorQueryParams == null) {
			this.paginatorQueryParams = { pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE };
		}
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
