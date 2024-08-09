import { booleanAttribute, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { AnimeType } from '@js-camp/core/models/anime';

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

	// TODO (Ky Tran): Emit filter
	/** Selection change event emitter. */
	@Output()
	public readonly selectionChange = new EventEmitter<MatSelectChange>();

	protected readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	private readonly destroyRef = inject(DestroyRef);

	/** Selected anime type. */
	// protected selectedType: AnimeType | null = null;

	/** Anime types. */
	protected readonly animeTypes = Object.values(AnimeType);

	// /** On Init. */
	// public ngOnInit(): void {
	// 	this.queryParamsProvider$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ type }) => {
	// 		this.selectedType = type;
	// 	});
	// }

	/**
	 * Selection change event handler.
	 * @param selectEvent Select Change event.
	 */
	protected onSelectionChange(selectEvent: MatSelectChange): void {
		this.selectionChange.emit(selectEvent);
	}
}
