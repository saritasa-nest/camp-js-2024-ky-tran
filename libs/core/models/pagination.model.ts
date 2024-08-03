/** Pagination Type. */
export type Pagination<T> = Readonly<{

	/** Total number of results. */
	readonly count: number;

	/** The link of the next page. */
	readonly next: string | null;

	/** The link of the previous page. */
	readonly previous: string | null;

	/** A list of results. */
	readonly results: readonly T[];
}>;
