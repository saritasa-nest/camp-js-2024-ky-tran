import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, inject, Input, numberAttribute, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '@js-camp/angular/shared/constants';
import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';

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

	/** The set of provided page size options to display to the user. */
	@Input() protected readonly pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;

	/** Whether to show the first/last buttons UI to the user. */
	@Input({ transform: booleanAttribute }) protected readonly showFirstLastButtons: boolean = true;

	/** Whether the paginator is disabled. */
	@Input({ transform: booleanAttribute }) protected readonly disabled = false;

	/** Page change event emitter. */
	@Output() public readonly pageChange = new EventEmitter<PageEvent>();

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	/** The zero-based page index of the displayed list of items. */
	protected readonly pageIndex$ = new BehaviorSubject<number>(DEFAULT_PAGE_NUMBER - 1);

	/** Number of items to display on a page. */
	protected readonly pageSize$ = new BehaviorSubject<number>(DEFAULT_PAGE_SIZE);

	public constructor() {
		this.queryParamsProvider$.pipe().subscribe(params => {
			const { pageNumber, pageSize } = params;

			if (pageNumber) {
				this.pageIndex$.next(pageNumber - 1);
			}

			if (pageSize) {
				this.pageSize$.next(pageSize);
			}
		});
	}

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
