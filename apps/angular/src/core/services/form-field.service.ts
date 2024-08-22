import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { listenControlTouched } from '@js-camp/angular/core/utils/rxjs/listenControlTouched';
import { FORM_STATUS_INVALID } from '@js-camp/angular/shared/constants';

/** Form Field service. */
@Injectable({ providedIn: 'root' })
export class FormFieldService {
	/**
	 * Create is invalid observable.
	 * @param control Form control.
	 */
	public createIsInvalidObservable(control: FormControl): Observable<boolean> {
		const isTouched$ = listenControlTouched(control);
		const status$ = control.statusChanges.pipe(startWith(FORM_STATUS_INVALID));

		return combineLatest([isTouched$, status$]).pipe(
			map(([isTouched, status]) => isTouched && status === FORM_STATUS_INVALID),
		);
	}
}
