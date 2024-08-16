import { inject, Injectable } from '@angular/core';
import { WINDOW } from '@js-camp/angular/core/providers/window.provider';
import { BehaviorSubject, defer, filter, fromEvent, map, merge, Observable, of, shareReplay, startWith } from 'rxjs';

/** Local storage service. */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	private readonly window = inject(WINDOW);

	private readonly localStorage = this.window.localStorage;

	private readonly valueChange$ = new BehaviorSubject('');

	/**
	 * Save data to local storage.
	 * @param key Key.
	 * @param data Data for save.
	 */
	public save<T>(key: string, data: T): Observable<void> {
		return defer(() => {
			this.localStorage.setItem(key, JSON.stringify(data));
			this.valueChange$.next(key);

			return of(undefined);
		});
	}

	/**
	 * Removed data from local storage.
	 * @param key Key.
	 */
	public remove(key: string): Observable<void> {
		return defer(() => {
			this.localStorage.removeItem(key);
			this.valueChange$.next(key);

			return of(undefined);
		});
	}

	/**
	 * Get data from from storage.
	 * @param key Key.
	 */
	public get<T>(key: string): Observable<T | null> {
		return this.detectStorageChange(key)
			.pipe(
				startWith(this.getByKey<T>(key)),
				map(() => this.getByKey<T>(key)),
				shareReplay({ refCount: true, bufferSize: 1 }),
			);
	}

	private getByKey<T>(key: string): T | null {
		const data = this.localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	}

	private detectStorageChange(detectedKey: string): Observable<void> {
		// const otherPageChange$ = fromEvent(this.window, 'storage').pipe(
		// 	filter((event): event is StorageEvent => event instanceof StorageEvent),
		// 	map(event => event.key),
		// );

		// otherPageChange$

		return merge(this.valueChange$)
			.pipe(
				filter(key => key === detectedKey),
				map(() => undefined),
			);
	}
}
