import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, ignoreElements, merge, MonoTypeOperatorFunction, shareReplay, throwError } from 'rxjs';
import { SnackbarComponent } from '@js-camp/angular/shared/components/error-snack-bar/error-snack-bar.component';

/** Notification service. */
@Injectable({ providedIn: 'root' })
export class NotificationService {
	private readonly snackBar = inject(MatSnackBar);

	/** Notify app error. */
	public notifyAppError<T>(): MonoTypeOperatorFunction<T> {
		return source$ => {
			const sharedSource$ = source$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));

			const catchError$ = sharedSource$.pipe(
				ignoreElements(),
				catchError((error: unknown) => throwError(() => {
					this.snackBar.openFromComponent(SnackbarComponent, {
						verticalPosition: 'top',
						horizontalPosition: 'right',
						data: { errorMessage: error instanceof Error ? error.message : 'Something went wrong!. Please try again.' },
					});

					return error;
				})),
			);

			return merge(catchError$, source$);
		};
	}
}
