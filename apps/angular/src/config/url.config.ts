import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Url Config. */
@Injectable({ providedIn: 'root' })
export class UrlConfig {
	/** Base url. */
	public readonly baseUrl = environment.baseUrl;

	/** Auth base url. */
	public readonly authBaseUrl = `${environment.baseUrl}/auth`;

	/** Auth sign in url. */
	public readonly authSignInUrl = `${this.authBaseUrl}/login/`;

	/** Users base url. */
	public readonly usersBaseUrl = `${environment.baseUrl}/users`;

	/** Users profile url. */
	public readonly usersProfileUrl = `${this.usersBaseUrl}/profile/`;

	/** Anime base url. */
	public readonly animeBaseUrl = `${environment.baseUrl}/anime`;

	/** Anime url. */
	public readonly animeUrl = `${this.animeBaseUrl}/anime/`;
}
