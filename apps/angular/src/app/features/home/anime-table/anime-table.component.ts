import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Anime } from '@js-camp/core/models/anime';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable-pipe';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { ErrorMessageComponent } from '@js-camp/angular/shared/components/error-message/error-message.component';
import { TableGeneric } from '@js-camp/angular/core/types/table-generic';
import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants';

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
	@Input({ required: true }) public isLoading!: boolean;

	/** Error message if something went wrong fetching anime list. */
	@Input({ required: true }) public error!: string;

	/** Anime table column names. */
	protected readonly animeColumns = tableGeneric.columnKeys;

	/** Column titles of the table. */
	protected readonly displayedColumns = Object.values(this.animeColumns);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/**
	 * Tracks anime by its unique identifier.
	 * @param _ - The index of the anime in the list.
	 * @param anime - The anime object.
	 * @returns The unique identifier of the anime.
	 */
	protected trackAnimeById(_: number, anime: Anime): Anime['id'] {
		return anime.id;
	}
}
