import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** App Config. */
@Injectable({ providedIn: 'root' })
export class AppConfig {
	/** Boolean value indicating if it is in production mode or not. */
	public readonly isProduction = environment.production;

	/** Base URL. */
	public readonly baseUrl = environment.baseUrl;

	/** Anime Base URL. */
	public readonly animeBaseUrl = environment.animeBaseUrl;

	/** Anime URL. */
	public readonly animeUrl: string;

	public constructor() {
		this.animeUrl = this.toAnimeBaseUrl('/anime/');
	}

	private toAnimeBaseUrl(path: string): string {
		return `${this.animeBaseUrl}${path}`;
	}
}
