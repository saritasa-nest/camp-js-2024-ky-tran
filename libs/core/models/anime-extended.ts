import { OmitImmerable } from './immerable';
import { AnimeOverview } from './anime-overview';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { Studio } from './studio';
import { Genre } from './genre';

/** Anime extended. */
export class AnimeExtended extends AnimeOverview {

	/** Youtube trailer Id. */
	public readonly youtubeTrailerId: string | null;

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

	/** A list of anime studios. */
	public readonly studios: readonly Studio[];

	/** A list of anime genres. */
	public readonly genres: readonly Genre[];

	public constructor(data: AnimeExtendedConstructorData) {
		super(data);
		this.youtubeTrailerId = data.youtubeTrailerId;
		this.rating = data.rating;
		this.source = data.source;
		this.season = data.season;
		this.synopsis = data.synopsis;
		this.airingStatus = data.airingStatus;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}

type AnimeExtendedConstructorData = OmitImmerable<AnimeExtended>;
