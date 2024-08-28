import { Immerable, OmitImmerable } from './immerable';
import { DateRange } from './date-range';
import { AnimeType } from './anime-type';
import { AnimeStatus } from './anime-status';

/** Anime overview model. */
export class AnimeOverview extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Creation date. */
	public readonly createdAt: Date;

	/** Modification date. */
	public readonly modifiedAt: Date;

	/** English title. */
	public readonly englishTitle: string;

	/** Japanese title. */
	public readonly japaneseTitle: string;

	/** Image source. */
	public readonly imageSrc: string | null;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Aired date. */
	public readonly aired: DateRange;

	public constructor(data: AnimeOverviewConstructorData) {
		super();
		this.id = data.id;
		this.createdAt = data.createdAt;
		this.modifiedAt = data.modifiedAt;
		this.imageSrc = data.imageSrc;
		this.englishTitle = data.englishTitle;
		this.japaneseTitle = data.japaneseTitle;
		this.type = data.type;
		this.status = data.status;
		this.aired = data.aired;
	}
}

type AnimeOverviewConstructorData = OmitImmerable<AnimeOverview>;
