import { booleanAttribute, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QUERY_PARAMS_TOKEN } from '@js-camp/angular/core/providers/query-params.provider';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

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
	public readonly searchChange = new EventEmitter<string | null>();

	private readonly searchChange$ = new BehaviorSubject<string | null>(null);

	private readonly queryParamsProvider$ = inject(QUERY_PARAMS_TOKEN);

	private readonly destroyRef = inject(DestroyRef);

	/** Search control. */
	protected searchControl = new FormControl<string>({ value: '', disabled: false });

	/** @inheritdoc */
	public ngOnInit(): void {
		this.initializeSearchControlFirstLoad();
		this.initializeSearchControlSideEffect();
	}

	private initializeSearchControlFirstLoad(): void {
		this.queryParamsProvider$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(({ search }) => {
				this.searchControl = new FormControl<string>({ value: search ? search.trim() : '', disabled: false });
			});
	}

	private initializeSearchControlSideEffect(): void {
		this.searchChange$
			.pipe(
				distinctUntilChanged(),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(search => this.searchChange.emit(search));
	}

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['disabled']?.currentValue) {
			this.searchControl.disable();
		} else {
			this.searchControl.enable();
		}
	}

	/** Search change handler. */
	protected onSearchChange(): void {
		const search = this.searchControl.value;
		this.searchChange$.next(search != null && search.trim() !== '' ? search : null);
	}
}
