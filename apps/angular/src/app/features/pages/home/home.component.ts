import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
	private readonly animeService = inject(AnimeService);

	/** All Anime kit stores loading status, error and data of fetching all anime. */
	public readonly allAnimeKit = this.animeService.allAnimeKit;

	/** On init. */
	public ngOnInit(): void {
		// Start fetching all anime.
		this.animeService.getAllAnime().subscribe({
			next: res => console.log(res),
		});
	}
}
