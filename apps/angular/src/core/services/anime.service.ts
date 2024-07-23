import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

import { PaginatedAnime, PaginatedAnimeDto } from '../types/anime.type';
import { AnimeMapper } from '../mappers/anime.mapper';
import { Anime } from '../models/anime.model';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly allAnime_ = signal<readonly Anime[]>([]);

	/** A list all anime for outside read. */
	public readonly allAnime = this.allAnime_.asReadonly();

	private mapAllAnimeDto(data: PaginatedAnimeDto): PaginatedAnime {
		return {
			...data,
			results: data.results.map(anime => this.animeMapper.fromDto(anime)),
		};
	}

	/** Get all animes service. */
	public getAllAnime(): Observable<unknown> {
		const url = `${environment.animeUrl}/anime/`;

		return this.httpClient.get<PaginatedAnimeDto>(url).pipe(
			map(responseDto => this.mapAllAnimeDto(responseDto)),
			tap({ next: response => this.allAnime_.set([...response.results]) }),
		);
	}
}
