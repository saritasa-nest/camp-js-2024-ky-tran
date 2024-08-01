import { AnimeType } from './anime';

/** Paginator. */
export type Paginator = {

	/** Page number. */
	pageNumber: number | null;

	/** Page size. */
	pageSize: number | null;
};

/** Sort. */
export type Sort = {

	/** Sort fields. */
	sortFields: string[] | null;
};

/** Filter. */
export type Filter = {

	/** Filter type. */
	type: AnimeType | null;
};

/** Search. */
export type Search = {

	/** Search query. */
	search: string | null;
};

/** Query params. */
export type QueryParams = Paginator & Sort & Filter & Search;
