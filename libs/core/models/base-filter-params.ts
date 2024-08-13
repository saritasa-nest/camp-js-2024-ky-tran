/** Base filter params domain model. */
export namespace BaseFilterParams {

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
