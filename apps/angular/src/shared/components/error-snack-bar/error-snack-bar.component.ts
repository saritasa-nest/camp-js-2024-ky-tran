import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_SNACK_BAR_DATA,
	MatSnackBarAction,
	MatSnackBarActions,
	MatSnackBarLabel,
	MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarData } from '@js-camp/angular/shared/types/snackbar-data';
import { SUCCESS_STATUS } from '@js-camp/angular/shared/constants';

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

	/** Snackbar data. */
	protected readonly data: SnackbarData = inject(MAT_SNACK_BAR_DATA);

	/** Success status. */
	protected readonly isSuccess = this.data.status === SUCCESS_STATUS;
}
