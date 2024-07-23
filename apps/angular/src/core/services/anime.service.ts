import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';
import { AllAnimeKit, PaginatedAnime, PaginatedAnimeDto } from '@js-camp/angular/core/types/anime.type';
import { AnimeMapper } from '@js-camp/angular/core/mappers/anime.mapper';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly baseUrl = `${environment.animeUrl}/anime/`;

	private allAnimeKit_ = signal<AllAnimeKit>({ isLoading: false, error: '', results: [] });

	/** All Anime kit stores loading status, error and data of fetching all anime. */
	public readonly allAnimeKit = this.allAnimeKit_.asReadonly();

	private updateAllAnimeKit(modifier: Partial<AllAnimeKit>): void {
		this.allAnimeKit_.update(prev => ({ ...prev, ...modifier }));
	}

	private mapAllAnimeDto(data: PaginatedAnimeDto): PaginatedAnime {
		return {
			...data,
			results: data.results.map(anime => this.animeMapper.fromDto(anime)),
		};
	}

	/** Get all anime service. */
	public getAllAnime(): Observable<unknown> {
		this.updateAllAnimeKit({ isLoading: true });
		this.updateAllAnimeKit({ error: '' });

		return this.httpClient.get<PaginatedAnimeDto>(this.baseUrl).pipe(
			map(responseDto => this.mapAllAnimeDto(responseDto)),
			tap({
				next: response => this.updateAllAnimeKit({ results: [...response.results] }),
				error: (error: unknown) => {
					console.error(error);
					this.updateAllAnimeKit({ error: 'Something went wrong fetching all anime. Please try again later.' });
				},
				complete: () => this.updateAllAnimeKit({ isLoading: false }),
			}),
		);
	}
}
