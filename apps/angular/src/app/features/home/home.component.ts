import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AnimeTableComponent } from '@js-camp/angular/app/features/home/anime-table/anime-table.component';
import { PaginatorComponent } from '@js-camp/angular/app/features/home/paginator/paginator.component';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [AnimeTableComponent, PaginatorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
