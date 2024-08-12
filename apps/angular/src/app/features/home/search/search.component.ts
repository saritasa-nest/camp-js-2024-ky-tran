import { booleanAttribute, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, distinctUntilChanged, ignoreElements, merge, Observable, skip, tap } from 'rxjs';
import { FILTER_PARAMS_TOKEN } from '@js-camp/angular/core/providers/filter-params.provider';

/** Search component. */
@Component({
	selector: 'camp-search',
	standalone: true,
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
	/** Whether the filter select is disabled. */
	@Input({ transform: booleanAttribute })
	protected set disabled(isDisabled: boolean) {
		if (isDisabled) {
			this.searchControl.disable();
		} else {
			this.searchControl.enable();
		}
	}

	/** Search change event emitter. */
	@Output()
	public readonly searchChange = new EventEmitter<string | null>();

	private readonly searchChange$ = new BehaviorSubject<string | null>(null);

	private readonly filterParamsProvider$ = inject(FILTER_PARAMS_TOKEN);

	private readonly destroyRef = inject(DestroyRef);

	/** Search control. */
	protected readonly searchControl = new FormControl('');

	/** @inheritdoc */
	public ngOnInit(): void {
		merge(this.searchChangeFirstLoad(), this.searchChangeSideEffect())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	private searchChangeFirstLoad(): Observable<void> {
		return this.filterParamsProvider$.pipe(
			tap(({ search }) => this.searchControl.setValue(search ? search.trim() : '')),
			ignoreElements(),
		);
	}

	private searchChangeSideEffect(): Observable<void> {
		return this.searchChange$.pipe(
			skip(1),
			distinctUntilChanged(),
			tap(search => this.searchChange.emit(search)),
			ignoreElements(),
		);
	}

	/** Search change handler. */
	protected onSearchChange(): void {
		const search = this.searchControl.value;
		this.searchChange$.next(search != null && search.trim() !== '' ? search : null);
	}
}
