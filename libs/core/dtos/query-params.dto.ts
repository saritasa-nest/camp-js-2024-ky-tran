import { SortDirection } from '../models/sort-direction.model';
import { SortFields } from '../models/sort-fields.model';

import { AnimeTypeDto } from './anime.dto';

export type QueryParamsCommonDto = Readonly<{

	/** Filter type. */
	type: AnimeTypeDto | null;

	/** Search query. */
	search: string | null;
}>;

/** Query params DTO (to Url). */
export type QueryParamsUrlDto = QueryParamsCommonDto & Readonly<{

	/** Page number. */
	pageNumber: number | null;

	/** Page size. */
	pageSize: number | null;

	/** Field. */
	sortField: SortFields | null;

	/** Direction. */
	sortDirection: SortDirection | null;
}>;

/** Query params DTO (to Back-end). */
export type QueryParamsDto = QueryParamsCommonDto & Readonly<{

	/** The initial index from which to return the results. */
	offset: number | null;

	/** Number of results to return per page. */
	limit: number | null;

	/** Sort fields. */
	ordering: string | null;
}>;
