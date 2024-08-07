import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Skeleton Cell component. */
@Component({
	selector: 'camp-skeleton-cell',
	standalone: true,
	templateUrl: './skeleton-cell.component.html',
	styleUrl: './skeleton-cell.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonCellComponent {
	/** Loading status code skeleton cell. */
	@Input({ required: true, transform: booleanAttribute })
	public isLoading!: boolean;
}
