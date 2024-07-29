import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Table Skeleton component. */
@Component({
	selector: 'camp-table-skeleton',
	standalone: true,
	templateUrl: './table-skeleton.component.html',
	styleUrl: './table-skeleton.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeletonComponent {}
