import { Immerable, OmitImmerable } from '@js-camp/core/models/immerable';
import { AnimeType } from '@js-camp/angular/core/enums/anime-type';
import { AnimeStatus } from '@js-camp/angular/core/enums/anime-status';
import { DateRange } from '@js-camp/angular/core/types/date-range';

/** Anime blue print. */
export class AnimeBluePrint extends Immerable {
	/** The unique identifier of the anime. */
	public readonly id: number;

	/** The creation date of the anime. */
	public readonly createdAt: Date;

	/** The last modified date of the anime. */
	public readonly modifiedAt: Date;

	/** The English title of the anime. */
	public readonly titleEng: string;

	/** The Japanese title of the anime. */
	public readonly titleJpn: string;

	/** The URL of the anime's image. */
	public readonly image: string;

	/** The airing date range of the anime. */
	public readonly aired: DateRange;

	/** The type of the anime (e.g., TV). */
	public readonly type: AnimeType;

	/** The current status of the anime (e.g., AIRING). */
	public readonly status: AnimeStatus;

	/** The average score of the anime. */
	public readonly score: number;

	/** The user's score for the anime. */
	public readonly userScore: number;

	/** An array of IDs representing the studios that produced the anime. */
	public readonly studios: readonly number[];

	/** An array of IDs representing the genres of the anime. */
	public readonly genres: readonly number[];

	public constructor(data: Anime) {
		super();

		this.id = data.id;
		this.createdAt = data.createdAt;
		this.modifiedAt = data.modifiedAt;
		this.titleEng = data.titleEng;
		this.titleJpn = data.titleJpn;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}

/** Type of Anime. */
export type Anime = OmitImmerable<AnimeBluePrint>;
