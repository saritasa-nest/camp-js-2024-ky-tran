import { Immerable, OmitImmerable } from './immerable';

/** Date range. */
export type DateRange = Readonly<{

	/** Start date. */
	startAt: Date | null;

	/** End date. */
	endAt: Date | null;
}>;

/** Anime type. */
export enum AnimeType {
	Tv = 'TV',
	Ova = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	Ona = 'ONA',
	Music = 'Music',
	PromotionalVideos = 'Promotional Videos',
	Unknown = 'Unknown',
}

/** Anime status. */
export enum AnimeStatus {
	Airing = 'Currently Airing',
	Finished = 'Finished Airing',
	NotYetAired = 'Not Yet Aired',
}

/** Anime blue print. */
export class AnimeBluePrint extends Immerable {
	/** The unique identifier of the anime. */
	public readonly id: number;

	/** The creation date of the anime. */
	public readonly createdAt: Date;

	/** The last modified date of the anime. */
	public readonly modifiedAt: Date;

	/** The English title of the anime. */
	public readonly englishTitle: string;

	/** The Japanese title of the anime. */
	public readonly japaneseTitle: string;

	/** The URL of the anime's image. */
	public readonly imageUrl: string;

	/** The airing date range of the anime. */
	public readonly aired: DateRange;

	/** The type of the anime (e.g., TV). */
	public readonly type: AnimeType;

	/** The current status of the anime (e.g., AIRING). */
	public readonly status: AnimeStatus;

	/** The average score of the anime. */
	public readonly averageScore: number | null;

	/** The user's score for the anime. */
	public readonly userScore: number | null;

	/** An array of IDs representing the studios that produced the anime. */
	public readonly studioIds: readonly number[];

	/** An array of IDs representing the genres of the anime. */
	public readonly genreIds: readonly number[];

	public constructor(data: Anime) {
		super();

		this.id = data.id;
		this.createdAt = data.createdAt;
		this.modifiedAt = data.modifiedAt;
		this.englishTitle = data.englishTitle;
		this.japaneseTitle = data.japaneseTitle;
		this.imageUrl = data.imageUrl;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.averageScore = data.averageScore;
		this.userScore = data.userScore;
		this.studioIds = data.studioIds;
		this.genreIds = data.genreIds;
	}
}

/** Type of Anime. */
export type Anime = OmitImmerable<AnimeBluePrint>;
