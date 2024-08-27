import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defer, of, shareReplay, tap } from 'rxjs';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Anime Details component. */
@Component({
	selector: 'camp-anime-details',
	standalone: true,
	templateUrl: './anime-details.component.html',
	styleUrl: './anime-details.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);

	private readonly destroyRef = inject(DestroyRef);

	private readonly animeService = inject(AnimeService);

	private readonly notificationService = inject(NotificationService);

	/** Anime details. */
	protected readonly animeDetails = signal<AnimeDetails | null>(null);

	/** Loading status. */
	protected readonly isLoading = signal(false);

	/** @inheritdoc */
	public ngOnInit(): void {
		const animeId = Number(this.route.snapshot.paramMap.get('id'));
		this.isLoading.set(true);

		defer(() => animeId ? this.animeService.getDetails(animeId) : of(null))
			.pipe(
				tap({ finalize: () => this.isLoading.set(false) }),
				this.notificationService.notifyAppErrorPipe(),
				shareReplay({ refCount: true, bufferSize: 1 }),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(animeDetails => {
				console.log(animeDetails);
				this.animeDetails.set(animeDetails);
			});
	}
}
