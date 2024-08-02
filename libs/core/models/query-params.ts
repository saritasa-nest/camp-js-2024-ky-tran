import { AnimeType } from './anime';

/** Query params. */
export type QueryParams = Readonly<{

	/** Page number. */
	pageNumber: number | null;

	/** Page size. */
	pageSize: number | null;

	/** Sort fields. */
	sortFields: string[] | null;

	/** Filter type. */
	type: AnimeType | null;

	/** Search query. */
	search: string | null;
}>;

/** Paginator query params. */
export type PaginatorQueryParams = Pick<QueryParams, 'pageNumber' | 'pageSize'>;
