import { AnimeTypeDto } from './anime';

/** Query params DTO. */
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
