/** Base filter params DTO. */
export namespace BaseFilterParamsDto {

	/** Paginator. */
	export type Paginator = Readonly<{

		/** The initial index from which to return the results. */
		offset: number | null;

		/** Number of results to return per page. */
		limit: number | null;
	}>;

	/** Search. */
	export type Search = Readonly<{

		/** Search query. */
		search: string | null;
	}>;

	/** Base query params. */
	export type Combined = Paginator & Search;
}
