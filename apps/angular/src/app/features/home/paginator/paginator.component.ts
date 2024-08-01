import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, numberAttribute, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

/** PaginatorComponent. */
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
	@Input({ transform: numberAttribute }) protected length: number | null = null;

	/** Number of items to display on a page. */
	@Input({ transform: numberAttribute }) protected readonly pageSize = 10;

	/** The set of provided page size options to display to the user. */
	@Input() protected readonly pageSizeOptions = [5, 10, 25, 100];

	/** Whether to show the first/last buttons UI to the user. */
	@Input({ transform: booleanAttribute }) protected readonly showFirstLastButtons = true;

	private readonly animeService = inject(AnimeService);

	/** Loading status of fetching anime list. */
	protected readonly isLoading$ = new Subject<boolean>();

	/** Stream of anime list. */
	// protected readonly animeList$: Observable<Pagination<Anime>>;

	public constructor() {
		const animeList$ = this.animeService.getAll().pipe(toggleExecutionState(this.isLoading$));

		this.isLoading$.subscribe(isLoading => {
			console.log('-->', isLoading);
		});

		animeList$.subscribe({
			next: data => console.log(data),
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
		console.log(pageEvent);
	}
}
