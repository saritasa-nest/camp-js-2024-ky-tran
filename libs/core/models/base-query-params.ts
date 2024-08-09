// TODO (Ky Tran): Update name
/** Base query params domain model. */
export namespace BaseQueryParams {

	/** Paginator. */
	export type Paginator = {

		/** Page number. */
		pageNumber: number | null;

		/** Page size. */
		pageSize: number | null;
	};

	/** Search. */
	export type Search = {

		/** Search query. */
		search: string | null;
	};

	/** Base query params. */
	export type Combined = Paginator & Search;
}
