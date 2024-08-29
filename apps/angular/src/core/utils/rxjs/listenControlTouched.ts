import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * Listen control touched.
 * @param control Control.
 */
export function listenControlTouched(control: AbstractControl): Observable<boolean> {
	return new Observable<boolean>(observer => {
		const originalMarkAsTouched = control.markAsTouched;
		const originalReset = control.reset;

		control.reset = (...args) => {
			originalReset.call(control, ...args);
			observer.next(false);
		};

		control.markAsTouched = (...args) => {
			originalMarkAsTouched.call(control, ...args);
			observer.next(true);
		};

		observer.next(control.touched);

		return () => {
			control.markAsTouched = originalMarkAsTouched;
			control.reset = originalReset;
		};
	});
}
