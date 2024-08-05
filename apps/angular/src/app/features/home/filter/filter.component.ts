import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

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
	/** Whether the paginator is disabled. */
	@Input({ transform: booleanAttribute }) protected readonly disabled = false;

	/** Selection change event emitter. */
	@Output() public readonly selectionChange = new EventEmitter<MatSelectChange>();

	/** Selected anime type. */
	protected readonly selectedType: AnimeType | undefined = undefined;

	/** Anime types. */
	protected readonly animeTypes = Object.values(AnimeType);

	/**
	 * Selection change event handler.
	 * @param selectEvent - Select Change event.
	 */
	protected onSelectionChange(selectEvent: MatSelectChange): void {
		this.selectionChange.emit(selectEvent);
	}
}
