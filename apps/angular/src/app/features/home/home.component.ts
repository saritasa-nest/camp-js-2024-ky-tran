import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Anime } from '@js-camp/angular/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeTableComponent } from '@js-camp/angular/app/features/components/anime-table/anime-table.component';
import { Pagination } from '@js-camp/core/models/pagination';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	imports: [AnimeTableComponent, AsyncPipe],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly animeService = inject(AnimeService);

	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	protected readonly error$ = new BehaviorSubject<string>('');

	protected allAnime$!: Observable<Pagination<Anime>>;

	public constructor() {
		this.loadAllAnime();
	}

	private loadAllAnime(): void {
		this.isLoading$.next(true);
		this.error$.next('');

		this.allAnime$ = this.animeService.getAllAnime().pipe(
			catchError((error) => {
				this.error$.next(error.message);
				return throwError(() => error);
			}),
			finalize(() => this.isLoading$.next(false)),
		);
	}
}
