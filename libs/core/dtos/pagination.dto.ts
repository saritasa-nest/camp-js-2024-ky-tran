/** Pagination meta info DTO. */
export type PaginationDto<T> = Readonly<{

	/** Total count of items. */
	count: number;

	/** Next page of items. */
	next: string | null;

	/** Previous page of items. */
	previous: string | null;

	/** Array of items requested. */
	results: readonly T[];
}>;
