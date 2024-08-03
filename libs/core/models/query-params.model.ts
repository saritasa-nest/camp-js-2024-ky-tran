import { SortDirection } from '../enums/sort-direction.enum';

import { AnimeType } from './anime.model';
import { SortFields } from './sort-fields.model';

/** Query params. */
export type QueryParams = Readonly<{

	/** Page number. */
	pageNumber: number | null;

	/** Page size. */
	pageSize: number | null;

	/** Field. */
	sortField: SortFields | null;

	/** Direction. */
	sortDirection: SortDirection | null;

	/** Filter type. */
	type: AnimeType | null;

	/** Search query. */
	search: string | null;
}>;

/** Paginator query params. */
export type PaginatorQueryParams = Pick<QueryParams, 'pageNumber' | 'pageSize'>;
