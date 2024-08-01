import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';

import { AnimeTableComponent } from '@js-camp/angular/app/features/home/anime-table/anime-table.component';
import { PaginatorComponent } from '@js-camp/angular/app/features/home/paginator/paginator.component';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { toggleExecutionState } from '@js-camp/angular/shared/utils/rxjs/toggleExecutionState';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [CommonModule, AnimeTableComponent, PaginatorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly animeService = inject(AnimeService);

	/** Stream of anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Loading status of fetching anime list - Subject. */
	protected readonly isLoadingSubject$ = new Subject<boolean>();

	/** Loading status of fetching anime list. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Error message if something went wrong fetching anime list - Subject. */
	protected readonly errorSubject$ = new Subject<string>();

	/** Error message if something went wrong fetching anime list. */
	protected readonly error$ = new BehaviorSubject<string>('');

	public constructor() {
		this.animeList$ = this.animeService.getAll().pipe(
			toggleExecutionState(this.isLoadingSubject$),
			catchError((error: unknown) => throwError(() => {
				const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
				this.error$.next(errorMessage);

				return error;
			})),
		);

		this.isLoadingSubject$.subscribe(isLoading => this.isLoading$.next(isLoading));
	}
}
