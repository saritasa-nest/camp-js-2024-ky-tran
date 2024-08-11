import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Injectable, Input, numberAttribute, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DEFAULT_ANIME_TOTAL, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '@js-camp/angular/shared/constants';
import { paginatorAttribute } from '@js-camp/angular/shared/attributes/paginator-attribute';
import { BaseFilterParams } from '@js-camp/core/models/base-filter-params';
import { NonNullableFields } from '@js-camp/core/types/non-nullable-fields';

/** MatPaginatorIntl for modifying the labels and text displayed. */
@Injectable()
class MatPaginatorIntlCro extends MatPaginatorIntl {
	/** A label for the page size selector. */
	public override itemsPerPageLabel = 'Anime per page:';
}

/** Paginator Component. */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	imports: [CommonModule, MatPaginatorModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }],
})
export class PaginatorComponent {
	/** The length of the total number of items that are being paginated. */
	@Input({ required: true, transform: numberAttribute })
	protected readonly length = DEFAULT_ANIME_TOTAL;

	/**
	 * Page paginator to store page index and page number.
	 * Page index: The zero-based page index of the displayed list of items.
	 * Page number: Number of items to display on a page.
	 */
	@Input({ required: true, transform: paginatorAttribute })
	protected readonly pagePaginator: NonNullableFields<BaseFilterParams.Paginator>;

	/** The set of provided page size options to display to the user. */
	@Input()
	protected readonly pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;

	/** Whether to show the first/last buttons UI to the user. */
	@Input({ transform: booleanAttribute })
	protected readonly showFirstLastButtons: boolean = true;

	/** Whether the paginator is disabled. */
	@Input({ transform: booleanAttribute })
	protected readonly disabled = false;

	/** Page change event emitter. */
	@Output()
	public readonly pageChange = new EventEmitter<BaseFilterParams.Paginator>();

	public constructor() {
		this.pagePaginator = { pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE };
	}

	/**
	 * Change event object that is emitted when the user selects a different page size or navigates to another page.
	 * @param pageEvent Page event.
	 */
	protected onPageChange({ pageIndex, pageSize }: PageEvent): void {
		this.pageChange.emit({ pageNumber: pageIndex + 1, pageSize });
	}
}
