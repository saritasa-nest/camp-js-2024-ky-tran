import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, numberAttribute, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '@js-camp/angular/shared/constants';

/** Paginator Component. */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	imports: [CommonModule, MatPaginatorModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements AfterViewInit {
	@ViewChild(MatPaginator) private readonly paginator!: MatPaginator;

	/** The length of the total number of items that are being paginated. */
	@Input({ transform: numberAttribute }) protected readonly length: number | null = null;

	/** The zero-based page index of the displayed list of items. */
	@Input({ transform: numberAttribute }) protected readonly pageIndex: number | null = 0;

	/** Number of items to display on a page. */
	@Input({ transform: numberAttribute }) protected readonly pageSize: number | null = DEFAULT_PAGE_SIZE;

	/** The set of provided page size options to display to the user. */
	@Input() protected readonly pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;

	/** Whether to show the first/last buttons UI to the user. */
	@Input({ transform: booleanAttribute }) protected readonly showFirstLastButtons = true;

	/** Whether the paginator is disabled. */
	@Input({ transform: booleanAttribute }) protected readonly disabled: boolean = false;

	/** Page change event emitter. */
	@Output() public readonly pageChange = new EventEmitter<PageEvent>();

	/** After View Init. */
	public ngAfterViewInit(): void {
		this.paginator._intl.itemsPerPageLabel = 'Anime per page:';

	}

	/**
	 * Change event object that is emitted when the user selects a different page size or navigates to another page.
	 * @param pageEvent Page event.
	 */
	protected onPageChange(pageEvent: PageEvent): void {
		this.pageChange.emit(pageEvent);
	}
}
