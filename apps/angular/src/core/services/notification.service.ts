import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, ignoreElements, merge, MonoTypeOperatorFunction, shareReplay, throwError } from 'rxjs';
import {
	DEFAULT_ERROR_MESSAGE,
	DEFAULT_SUCCESS_MESSAGE,
	ERROR_STATUS,
	SNACKBAR_DURATION_IN_SECOND,
	SUCCESS_STATUS,
} from '@js-camp/angular/shared/constants';
import { SnackbarComponent } from '@js-camp/angular/shared/components/error-snack-bar/error-snack-bar.component';
import { SnackbarData, SnackbarDataStatus } from '@js-camp/angular/shared/types/snackbar-data';

/** Notification service. */
@Injectable({ providedIn: 'root' })
export class NotificationService {
	private readonly snackBar = inject(MatSnackBar);

	private readonly snackbarPosition = {
		verticalPosition: 'top',
		horizontalPosition: 'right',
	};

	private openSnackbar(data: SnackbarData, durationMillisecondOption: { duration?: number }) {
		this.snackBar.openFromComponent(SnackbarComponent, {
			data,
			verticalPosition: 'top',
			horizontalPosition: 'right',
			...durationMillisecondOption,
		});
	}

	/**
	 * Notify app success.
	 * @param successMessage Success message.
	 * @param durationInSecond Duration in second.
	 */
	public notifyAppSuccess(successMessage: string | null, durationInSecond = SNACKBAR_DURATION_IN_SECOND): void {
		const durationMillisecondOption = durationInSecond ? { duration: durationInSecond * 1000 } : {};

		this.openSnackbar(
			{ status: SnackbarDataStatus.Success, message: successMessage ?? DEFAULT_SUCCESS_MESSAGE },
			durationMillisecondOption,
		);
	}

	/**
	 * Notify app error.
	 * @param errorMessage Error message.
	 * @param durationInSecond Duration in second.
	 */
	public notifyAppError(errorMessage: string | null, durationInSecond = SNACKBAR_DURATION_IN_SECOND): void {
		const durationMillisecondOption = durationInSecond ? { duration: durationInSecond * 1000 } : {};

		this.openSnackbar(
			{ status: SnackbarDataStatus.Error, message: errorMessage ?? DEFAULT_ERROR_MESSAGE },
			durationMillisecondOption,
		);
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
