import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	EventEmitter,
	inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { distinctUntilChanged } from 'rxjs';

/** Search component. */
@Component({
	selector: 'camp-search',
	standalone: true,
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnChanges {
	/** Whether the filter select is disabled. */
	@Input({ transform: booleanAttribute })
	protected readonly disabled = false;

	/** Search change event emitter. */
	@Output()
	public readonly searchChange = new EventEmitter<string>();

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	private readonly destroyRef = inject(DestroyRef);

	/** Search control. */
	protected searchControl = new FormControl<string>({ value: '', disabled: false });

	/** @inheritdoc */
	public ngOnInit(): void {
		this.queryParamsProvider$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ search }) => {
			this.searchControl = new FormControl<string>({ value: search ? search.trim() : '', disabled: false });
		});
		// const searchResults$ = this.searchControl.valueChanges.pipe(
		// 	distinctUntilChanged()
		// )
		// TODO Tao mot cai observable o day
		// searchResult$ = this.searchControl.valueChanages
	}

	// private initializeSearchControlSideEffect

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['disabled']) {
			const { currentValue: isDisabled } = changes['disabled'];
			// TODO Use this.searchControl.disable();
			this.searchControl[isDisabled ? 'disable' : 'enable']();
		}
	}

	// public onSearchClick() {
	// 	searchResults$.subscribe()
	// }

	// TODO Research https://rxjs.dev/api/operators/distinctUntilChanged

	/** Search change fired when enter is hit to emit search value event. */
	protected onSearchChange = this.onSearchChangeCache(this);

	private onSearchChangeCache(instance: SearchComponent): () => void {
		let cacheSearchTerm: string | null = null;

		/** Inner On search change. */
		function inner(): void {
			// Search term can not be null, just a string or an empty string.
			const searchTerm = (instance.searchControl.value as string).trim();

			if (searchTerm !== cacheSearchTerm) {
				cacheSearchTerm = searchTerm;
				instance.searchChange.emit(searchTerm);
			}
		}

		return inner.bind(this);
	}
}
