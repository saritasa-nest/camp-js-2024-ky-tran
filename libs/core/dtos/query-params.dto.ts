import { AnimeTypeUrlDto } from './anime-type-url.dto';
import { AnimeTypeDto } from './anime.dto';
import { SortDirectionUrlDto } from './sort-direction-url.dto';
import { SortFieldsUrlDto } from './sort-fields-url.dto';

/** Query params DTO (to Url). */
export type QueryParamsUrlDto = Readonly<{

	/** Page number. */
	pageNumber: number | null;

	/** Page size. */
	pageSize: number | null;

	/** Field. */
	sortField: SortFieldsUrlDto | null;

	/** Direction. */
	sortDirection: SortDirectionUrlDto | null;

	/** Filter type. */
	type: AnimeTypeUrlDto | null;

	/** Search query. */
	search: string | null;
}>;

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
