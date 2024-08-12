import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, catchError, finalize, Observable, throwError } from 'rxjs';

import { Anime } from '@js-camp/core/models/anime';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable-pipe';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { ErrorMessageComponent } from '@js-camp/angular/shared/components/error-message/error-message.component';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants';

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
	private readonly animeService = inject(AnimeService);

	/** Anime table column names. */
	protected readonly animeColumns = AnimeTableColumns;

	/** Column titles of the table. */
	protected readonly displayedColumns = Object.values(this.animeColumns);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Stream of anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Loading status of fetching anime list. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Error message if something went wrong fetching anime list. */
	protected readonly error$ = new BehaviorSubject('');

	public constructor() {
		this.isLoading$.next(true);

		this.animeList$ = this.animeService.getAnimeList().pipe(
			catchError((error: unknown) => {
				const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
				this.error$.next(errorMessage);

				return throwError(() => error);
			}),
			finalize(() => this.isLoading$.next(false)),
		);
	}

	/**
	 * Get description of an anime image.
	 * @param anime - Anime.
	 */
	protected animeImageDescription(anime: Anime): string {
		return anime.englishTitle || anime.japaneseTitle || 'Anime image';
	}

	/**
	 * Check if list of anime is empty after fetching data.
	 * @param isLoading - Loading status.
	 * @param error - Error message.
	 * @param anime - List of anime.
	 */
	protected isNoData(isLoading: boolean | null, error: string | null, anime: readonly Anime[]): boolean {
		return isLoading === false && error === '' && anime.length === 0;
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
