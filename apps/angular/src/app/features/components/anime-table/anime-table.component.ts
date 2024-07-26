import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Anime } from '@js-camp/angular/core/models/anime';
import { NoEmpty } from '@js-camp/angular/core/pipes/no-empty.pipe';

/** Anime Table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, NoEmpty],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** A list of all anime. */
	public readonly allAnime = input.required<readonly Anime[]>();

	/** Colum titles of the table. */
	protected readonly displayedColumns: readonly string[] = ['image', 'title_eng', 'title_jpn', 'aired.start', 'type', 'status'];

	/**
	 * Tracks anime by its unique identifier.
	 * @param index - The index of the anime in the list.
	 * @param anime - The anime object.
	 * @returns The unique identifier of the anime.
	 */
	protected trackAnimeById(index: number, anime: Anime): Anime['id'] {
		return anime.id;
	}
}
