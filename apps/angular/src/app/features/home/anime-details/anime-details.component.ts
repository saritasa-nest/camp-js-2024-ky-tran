import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { defer, of, shareReplay, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { NullablePipe } from '@js-camp/angular/core/pipes/nullable.pipe';
import { AnimeImagePopupComponent } from '@js-camp/angular/app/features/home/anime-details/anime-image-popup/anime-image-popup.component';
import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { SafePipe } from '@js-camp/angular/core/pipes/safe.pipe';
import { AnimeExtended } from '@js-camp/core/models/anime-extended';

/** Anime information. */
type AnimeInformation = Readonly<{

	/** Label. */
	label: string;

	/** Value. */
	value: string;
}>;

/** Anime Details component. */
@Component({
	selector: 'camp-anime-details',
	standalone: true,
	templateUrl: './anime-details.component.html',
	styleUrl: './anime-details.component.css',
	imports: [MatDialogContent, ProgressSpinnerComponent, SafePipe, NullablePipe],
	providers: [DatePipe, NullablePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);

	private readonly destroyRef = inject(DestroyRef);

	private readonly datePipe = inject(DatePipe);

	private readonly nullablePipe = inject(NullablePipe);

	private readonly dialog = inject(MatDialog);

	private readonly animeService = inject(AnimeService);

	private readonly notificationService = inject(NotificationService);

	/** Anime details. */
	protected readonly animeDetails = signal<AnimeExtended | null>(null);

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
	 * Get image alternative text.
	 * @param anime Anime details.
	 */
	protected imageAlternativeText({ japaneseTitle, englishTitle }: AnimeExtended): string {
		return japaneseTitle ?? englishTitle ?? 'Anime image';
	}

	/**
	 * Get anime information.
	 * @param anime Anime details.
	 */
	protected animeInformation(anime: AnimeExtended): AnimeInformation[] {
		const { type, status, rating, source, season, synopsis, airingStatus, aired, studios, genres } = anime;

		const startAt = this.nullablePipe.transform(
			this.datePipe.transform(aired?.startAt, this.dateFormat),
			this.placeholder,
		);

		const endAt = this.nullablePipe.transform(
			this.datePipe.transform(aired?.endAt, this.dateFormat),
			this.placeholder,
		);

		return [
			{ label: 'Type', value: type },
			{ label: 'Status', value: status },
			{ label: 'Rating', value: rating },
			{ label: 'Source', value: source },
			{ label: 'Season', value: season },
			{ label: 'Synopsis', value: synopsis },
			{ label: 'Airing status', value: airingStatus },
			{ label: 'Aired date', value: `${startAt} to ${endAt}` },
			{ label: 'Studios', value: this.formatListToString(studios) },
			{ label: 'Genres', value: this.formatListToString(genres) },
		];
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
	protected getYoutubeTrailerUrl(id: AnimeExtended['youtubeTrailerId']): string {
		return `https://www.youtube.com/embed/${id}?hl=en`;
	}
}
