import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

/** PaginatorComponent. */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	imports: [MatPaginatorModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {}
