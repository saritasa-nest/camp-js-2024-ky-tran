import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { AnimeType } from '@js-camp/core/models/anime.model';

/** Filter component. */
@Component({
	selector: 'camp-filter',
	standalone: true,
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.css',
	imports: [MatFormFieldModule, MatSelectModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
	/** Whether the filter select is disabled. */
	@Input({ transform: booleanAttribute }) protected readonly disabled = false;

	/** Selection change event emitter. */
	@Output() public readonly selectionChange = new EventEmitter<MatSelectChange>();

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	/** Selected anime type. */
	protected selectedType: AnimeType | null = null;

	/** Anime types. */
	protected readonly animeTypes = Object.values(AnimeType);

	public constructor() {
		this.queryParamsProvider$.subscribe(({ type }) => {
			if (type) {
				this.selectedType = type;
			}
		});
	}

	/**
	 * Selection change event handler.
	 * @param selectEvent - Select Change event.
	 */
	protected onSelectionChange(selectEvent: MatSelectChange): void {
		this.selectionChange.emit(selectEvent);
	}
}
