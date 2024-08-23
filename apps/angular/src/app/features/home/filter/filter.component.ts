import { booleanAttribute, ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FILTER_PARAMS_TOKEN } from '@js-camp/angular/core/providers/filter-params.provider';
import { AnimeType } from '@js-camp/core/models/anime';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { toSignal } from '@angular/core/rxjs-interop';

/** Filter component. */
@Component({
	selector: 'camp-filter',
	standalone: true,
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.css',
	imports: [CommonModule, MatFormFieldModule, MatSelectModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
	/** Whether the filter select is disabled. */
	@Input({ transform: booleanAttribute })
	protected readonly disabled = false;

	/** Selection change event emitter. */
	@Output()
	public readonly selectionChange = new EventEmitter<AnimeFilterParams.Filter>();

	/** Filter params provider. */
	protected readonly filterParamsProvider = toSignal(inject(FILTER_PARAMS_TOKEN));

	/** Anime types. */
	protected readonly animeTypes = Object.values(AnimeType);

	/** Selected types to display on filter UI. */
	protected selectedTypes = computed(() => {
		const types: string[] = [...(this.filterParamsProvider()?.typeIn ?? [])];

		if (types.length === this.animeTypes.length) {
			types.push('all');
		}

		return types;
	});

	private selectedFields(fields: readonly string[]): AnimeType[] | null {
		const isSelectedAllBefore = this.filterParamsProvider()?.typeIn?.length === this.animeTypes.length;
		const isSelectedAll = fields.some(field => field === 'all');

		if (!fields.length) {
			return null;
		}
		if (isSelectedAllBefore) {
			return isSelectedAll ? [...fields.filter(field => field !== 'all')] as AnimeType[] : null ;
		}
		return isSelectedAll ? this.animeTypes : fields as AnimeType[];
	}

	/**
	 * Selection change event handler.
	 * @param selectEvent Select Change event.
	 */
	protected onSelectionChange(selectEvent: MatSelectChange): void {
		this.selectionChange.emit({ typeIn: this.selectedFields(selectEvent.value) });
	}
}
