import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Url Config. */
@Injectable({ providedIn: 'root' })
export class UrlConfig {
	/** Base URL. */
	public readonly baseUrl = environment.baseUrl;

	/** Anime Base URL. */
	public readonly animeBaseUrl = `${environment.baseUrl}/anime`;

	/** Anime URL. */
	public readonly animeUrl = `${this.animeBaseUrl}/anime/`;
}
