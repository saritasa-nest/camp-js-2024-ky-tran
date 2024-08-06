import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
	MAT_SNACK_BAR_DATA,
	MatSnackBarAction,
	MatSnackBarActions,
	MatSnackBarLabel,
	MatSnackBarRef,
} from '@angular/material/snack-bar';

import { ErrorSnackBarData } from '@js-camp/angular/shared/types/error-snack-bar-data';

/** Snackbar component. */
@Component({
	selector: 'camp-snackbar',
	standalone: true,
	templateUrl: './error-snack-bar.component.html',
	styleUrl: './error-snack-bar.component.css',
	imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
	/** Snack bar ref. */
	protected readonly snackBarRef = inject(MatSnackBarRef);

	public constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ErrorSnackBarData) {}
}
