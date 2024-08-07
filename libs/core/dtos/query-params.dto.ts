import { AnimeTypeDto } from './anime.dto';

/** Query params DTO (to Back-end). */
export type QueryParamsDto = Readonly<{

	/** The initial index from which to return the results. */
	offset: number | null;

	/** Number of results to return per page. */
	limit: number | null;

	/** Sort fields. */
	ordering: string | null;

	/** Filter type. */
	type: AnimeTypeDto | null;

	/** Search query. */
	search: string | null;
}>;
