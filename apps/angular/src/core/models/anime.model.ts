import { Immerable, OmitImmerable } from '@js-camp/core/models/immerable';

/** Date range. */
type DateRange = {

	/** Start date in ISO format. */
	readonly start: string;

	/** End date in ISO format. */
	readonly end: string;
};

/** Anime type. */
export enum AnimeType {
	Tv = 'Tv',
	Ova = 'Ova',
	Movie = 'Movie',
	Special = 'Special',
	Ona = 'Ona',
	Music = 'Music',
	PromotionalVideos = 'Promotional Videos',
	Unknown = 'Unknown',
}

/** Anime status. */
export enum AnimeStatus {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'Not Yet Aired',
}

/** Anime blue print. */
export class AnimeBluePrint extends Immerable {
	/** The unique identifier of the anime. */
	public readonly id: number;

	/** The creation date of the anime record in ISO format. */
	public readonly createdAt: string;

	/** The last modified date of the anime record in ISO format. */
	public readonly modifiedAt: string;

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
