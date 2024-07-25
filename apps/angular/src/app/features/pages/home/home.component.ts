import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeTableComponent } from '@js-camp/angular/app/features/components/anime-table.component';

/** Home page. */
@Component({
	selector: 'camp-home',
	standalone: true,
	imports: [CommonModule, AnimeTableComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);

	private readonly animeService = inject(AnimeService);

	/** All Anime kit stores loading status, error and data of fetching all anime. */
	public readonly allAnimeKit = this.animeService.allAnimeKit;

	private unsubscribe(subscription: Subscription): void {
		this.destroyRef.onDestroy(() => subscription.unsubscribe());
	}

	/** On init. */
	public ngOnInit(): void {
		const subscription = this.animeService.getAllAnime().subscribe();
		this.unsubscribe(subscription);
	}
}
