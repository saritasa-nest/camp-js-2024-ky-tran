import { InjectionToken } from '@angular/core';

/** Window provider. */
export const WINDOW = new InjectionToken<Window>('WINDOW', {
	providedIn: 'root',
	factory: () => window,
});
