import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Url Config. */
@Injectable({ providedIn: 'root' })
export class UrlConfig {
	/** Base url. */
	public readonly baseUrl = environment.baseUrl;

	/** Auth base url. */
	public readonly authBaseUrl = `${environment.baseUrl}/auth`;

	/** Sin in url. */
	public readonly signInUrl = `${this.authBaseUrl}/login/`;

	/** Anime base url. */
	public readonly animeBaseUrl = `${environment.baseUrl}/anime`;

	/** Anime url. */
	public readonly animeUrl = `${this.animeBaseUrl}/anime/`;
}
