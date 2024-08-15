import { CanMatchFn } from '@angular/router';
import { map, of, tap } from 'rxjs';

/** Auth guard. */
export function authGuard(): CanMatchFn {
	return () => {
		console.log(123);

		return of(true).pipe(
			tap(() => console.log('Hi, I am auth guard!')),
			map(() => true),
		);
	};
}
