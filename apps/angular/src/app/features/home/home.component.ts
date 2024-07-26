import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Anime } from '@js-camp/angular/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeTableComponent } from '@js-camp/angular/app/features/components/anime-table/anime-table.component';
import { Pagination } from '@js-camp/core/models/pagination';
import { HttpErrorResponse } from '@angular/common/http';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [AnimeTableComponent, AsyncPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly animeService = inject(AnimeService);

	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Error message if something went wrong. */
	protected readonly error$ = new BehaviorSubject<string>('');

	/** List of all anime stream. */
	protected allAnime$!: Observable<Pagination<Anime>>;

	public constructor() {
		this.loadAllAnime();
	}

	private loadAllAnime(): void {
		this.isLoading$.next(true);
		this.error$.next('');

		this.allAnime$ = this.animeService.getAllAnime().pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					this.error$.next(error.message);
				}

				this.error$.next('Something went wrong!');
				return throwError(() => error);
			}),
			finalize(() => this.isLoading$.next(false)),
		);
	}
}
