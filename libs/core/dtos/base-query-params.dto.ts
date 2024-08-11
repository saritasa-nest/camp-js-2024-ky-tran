/** Base query params DTO. */
export namespace BaseQueryParamsDto {

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
