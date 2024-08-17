import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, ignoreElements, merge, MonoTypeOperatorFunction, shareReplay, throwError } from 'rxjs';
import { SnackbarComponent } from '@js-camp/angular/shared/components/error-snack-bar/error-snack-bar.component';
import { DEFAULT_ERROR_MESSAGE } from '@js-camp/angular/shared/constants';

/** Notification service. */
@Injectable({ providedIn: 'root' })
export class NotificationService {
	private readonly snackBar = inject(MatSnackBar);

	/**
	 * Notify app error.
	 * @param errorMessage Error message.
	 * @param durationInSecond Duration in second.
	 */
	public notifyAppError(errorMessage: string | null, durationInSecond?: number): void {
		const durationMillisecondOption = durationInSecond ? { duration: durationInSecond * 1000 } : {};

		this.snackBar.openFromComponent(SnackbarComponent, {
			verticalPosition: 'top',
			horizontalPosition: 'right',
			data: { errorMessage: errorMessage ?? DEFAULT_ERROR_MESSAGE },
			...durationMillisecondOption,
		});
	}

	/** Notify app error pipe. */
	public notifyAppErrorPipe<T>(): MonoTypeOperatorFunction<T> {
		return source$ => {
			const sharedSource$ = source$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));

			const catchError$ = sharedSource$.pipe(
				ignoreElements(),
				catchError((error: unknown) => throwError(() => {
					this.notifyAppError(error instanceof Error ? error.message : null);
					return error;
				})),
			);

			return merge(catchError$, source$);
		};
	}
}
