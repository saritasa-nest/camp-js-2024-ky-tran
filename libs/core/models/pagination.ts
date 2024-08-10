/** Pagination type. */
export type Pagination<T> = Readonly<{

	/** Total number of results. */
	count: number;

	/** The link of the next page. */
	next: string | null;

	/** The link of the previous page. */
	previous: string | null;

	/** A list of results. */
	results: readonly T[];
}>;
