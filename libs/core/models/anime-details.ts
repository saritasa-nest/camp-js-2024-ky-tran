import { Immerable, OmitImmerable } from './immerable';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { Studio } from './studio';
import { Genre } from './genre';
import { AnimeStatus, AnimeType } from './anime';
import { AnimeSource } from './anime-source';
import { DateRange } from './date-range';

/** Anime details. */
export class AnimeDetails extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Image source. */
	public readonly imageSrc: string | null;

	/** YouTube trailer Id. */
	public readonly youtubeTrailerId: string | null;

	/** English title. */
	public readonly englishTitle: string;

	/** Japanese title. */
	public readonly japaneseTitle: string;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Rating. */
	public readonly rating: AnimeRating;

	/** Source. */
	public readonly source: AnimeSource;

	/** Season. */
	public readonly season: AnimeSeason;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Airing status. */
	public readonly airingStatus: 'Airing' | 'Finish airing';

	/** Airing date range.. */
	public readonly aired: DateRange;

	/** A list of anime studios. */
	public readonly studios: readonly Studio[];

	/** A list of anime genres. */
	public readonly genres: readonly Genre[];

	public constructor(data: AnimeDetailedConstructorData) {
		super();
		this.id = data.id;
		this.imageSrc = data.imageSrc;
		this.youtubeTrailerId = data.youtubeTrailerId;
		this.englishTitle = data.englishTitle;
		this.japaneseTitle = data.japaneseTitle;
		this.type = data.type;
		this.status = data.status;
		this.rating = data.rating;
		this.source = data.source;
		this.season = data.season;
		this.synopsis = data.synopsis;
		this.airingStatus = data.airingStatus;
		this.aired = data.aired;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}

type AnimeDetailedConstructorData = OmitImmerable<AnimeDetails>;
