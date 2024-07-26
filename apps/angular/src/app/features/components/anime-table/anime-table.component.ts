import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Anime } from '@js-camp/angular/core/models/anime';
import { FallbackString } from '@js-camp/angular/core/pipes/fallback-string.pipe';
import { TableColumns } from '@js-camp/angular/core/types/table.type';

/** Anime Table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, FallbackString],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** A list of all anime. */
	public readonly allAnime = input.required<readonly Anime[]>();

	/** Column titles of the table in an object. */
	protected readonly displayedColumnsObj!: TableColumns;

	/** Column titles of the table. */
	protected readonly displayedColumns!: readonly string[];

	public constructor() {
		this.displayedColumnsObj = {
			image: 'Image',
			englishTitle: 'English Title',
			japaneseTitle: 'Japanese Title',
			airedStart: 'Start Date',
			type: 'Type',
			status: 'Status',
		};

		this.displayedColumns = Object.values(this.displayedColumnsObj);
	}

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
