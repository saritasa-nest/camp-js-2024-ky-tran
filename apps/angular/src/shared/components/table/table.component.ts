import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime.model';

/** Table component. */
@Component({
	selector: 'camp-table',
	standalone: true,
	imports: [CommonModule, MatTableModule],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css',
})
export class TableComponent {
	/** A list of all anime. */
	public readonly allAnime = input.required<readonly Anime[]>();

	/** Colum titles of the table. */
	protected readonly displayedColumns: readonly string[] = ['image', 'title_eng', 'title_jpn', 'aired.start', 'type', 'status'];
}
