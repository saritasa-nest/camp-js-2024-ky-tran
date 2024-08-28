import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { defer, of, shareReplay, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { AnimeImagePopupComponent } from '@js-camp/angular/app/features/home/anime-details/anime-image-popup/anime-image-popup.component';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { SafePipe } from '@js-camp/angular/core/pipes/safe.pipe';

/** Anime Details component. */
@Component({
	selector: 'camp-anime-details',
	standalone: true,
	templateUrl: './anime-details.component.html',
	styleUrl: './anime-details.component.css',
	imports: [CommonModule, NullablePipe, MatDialogContent, ProgressSpinnerComponent, SafePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
	/** Image dialog. */
	@ViewChild('imageDialog') private readonly imageDialog: TemplateRef<unknown> | null = null;

	private readonly route = inject(ActivatedRoute);

	private readonly destroyRef = inject(DestroyRef);

	private readonly dialog = inject(MatDialog);

	private readonly animeService = inject(AnimeService);

	private readonly notificationService = inject(NotificationService);

	/** Anime details. */
	protected readonly animeDetails = signal<AnimeDetails | null>(null);

	/** Loading status. */
	protected readonly isLoading = signal(false);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Placeholder. */
	protected readonly placeholder = 'N/A';

	/** @inheritdoc */
	public ngOnInit(): void {
		const animeId = Number(this.route.snapshot.paramMap.get('id'));
		this.handleStartFetchingSideEffect();

		defer(() => animeId ? this.animeService.getDetails(animeId) : of(null))
			.pipe(
				tap({ finalize: () => this.handleFinishFetchingSideEffect() }),
				this.notificationService.notifyAppErrorPipe(),
				shareReplay({ refCount: true, bufferSize: 1 }),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(animeDetails => this.animeDetails.set(animeDetails));
	}

	private handleStartFetchingSideEffect(): void {
		this.isLoading.set(true);
	}

	private handleFinishFetchingSideEffect(): void {
		this.isLoading.set(false);
	}

	/**
	 * Open image popup.
	 * @param imageSrc Image source.
	 * @param imageAlt Image alternative text.
	 */
	protected openImagePopup(imageSrc: string | null, imageAlt: string): void {
		this.dialog.open(AnimeImagePopupComponent, { data: { imageSrc, imageAlt } });
	}

	/**
	 * Format list of items to string.
	 * @param array List of items.
	 * @example
	 * ```
	 * formatListToString([1, 2, 3]) -> '1, 2, 3'
	 * ```
	 */
	protected formatListToString<T extends { name: string; }>(array: readonly T[]): string {
		return array.map(item => item.name).join(', ');
	}

	/**
	 * Get youtube trailer url by anime id.
	 * @param id Anime id.
	 */
	protected getYoutubeTrailerUrl(id: AnimeDetails['youtubeTrailerId']): string {
		return `https://www.youtube.com/embed/${id}?hl=en`;
	}
}
