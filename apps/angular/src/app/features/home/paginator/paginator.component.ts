import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, Input, numberAttribute, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/** PaginatorComponent. */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	imports: [MatPaginatorModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements AfterViewInit {
	@ViewChild(MatPaginator) private readonly paginator!: MatPaginator;

	/** The length of the total number of items that are being paginated. */
	@Input({ transform: numberAttribute }) protected readonly length = 100;

	/** Number of items to display on a page. */
	@Input({ transform: numberAttribute }) protected readonly pageSize = 10;

	/** The set of provided page size options to display to the user. */
	@Input() protected readonly pageSizeOptions = [5, 10, 25, 100];

	/** Whether to show the first/last buttons UI to the user. */
	@Input({ transform: booleanAttribute }) protected readonly showFirstLastButtons = true;

	/** After View Init. */
	public ngAfterViewInit(): void {
		this.paginator._intl.itemsPerPageLabel = 'Anime per page:';
	}

	/**
	 * Change event object that is emitted when the user selects a different page size or navigates to another page.
	 * @param pageEvent Page event.
	 */
	protected onPageChange(pageEvent: PageEvent): void {
		console.log(pageEvent);
	}
}
