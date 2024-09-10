import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

type DeleteConfirmationData = Readonly<{

	/** Anime title. */
	title: string;
}>;

/** Delete Confirmation Dialog component. */
@Component({
	selector: 'camp-delete-confirmation-dialog',
	standalone: true,
	templateUrl: './delete-confirmation-dialog.component.html',
	styleUrl: './delete-confirmation-dialog.component.css',
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationDialogComponent {
	private readonly dialog = inject(MatDialogRef);

	/** Delete confirmation data. */
	protected readonly data = inject<DeleteConfirmationData>(MAT_DIALOG_DATA);

	/** Whether if delete action is in progress. */
	public isDeleting$ = new BehaviorSubject(false);

	/** Cancel delete action. */
	public onCancel(): void {
		this.dialog.close();
	}

	/** Confirm delete action. */
	protected onConfirm(): void {
		this.isDeleting$.next(true);
	}
}
