/** Base query params. */
export namespace BaseQueryParams {

	/** Paginator. */
	export type Paginator = Readonly<{

		/** Page number. */
		pageNumber: number | null;

		/** Page size. */
		pageSize: number | null;
	}>;

	/** Search. */
	export type Search = Readonly<{

		/** Search query. */
		search: string | null;
	}>;

	/** Base query params. */
	export type Combined = Paginator & Search;
}
