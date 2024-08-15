import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { LocalStorageService } from '@js-camp/angular/core/services/local-storage.service';
import { USER_STORAGE_KEY } from '@js-camp/angular/shared/constants';

/** User storage service. */
@Injectable({ providedIn: 'root' })
export class UserStorageService {
	private readonly localStorageService = inject(LocalStorageService);

	/** Get user secret from local storage. */
	public readonly secret$: Observable<UserSecret | null> = this.localStorageService.get(USER_STORAGE_KEY);

	/**
	 * Save user secret to local storage.
	 * @param secret User secret.
	 */
	public saveSecret(secret: UserSecret): Observable<UserSecret> {
		return this.localStorageService.save(USER_STORAGE_KEY, secret).pipe(map(() => secret));
	}

	/** Remove user secret from local storage. */
	public removeSecret(): Observable<void> {
		return this.localStorageService.remove(USER_STORAGE_KEY);
	}
}
