import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** App Config. */
@Injectable({ providedIn: 'root' })
export class AppConfig {
	/** Boolean value indicating if it is in production mode or not. */
	public readonly isProduction = environment.production;
}
