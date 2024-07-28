/** Date range. */
export type DateRange = Readonly<{

	/** Start date. */
	startAt: Date | null;

	/** End date. */
	endAt: Date | null;
}>;

/** Date Range DTO. */
export type DateRangeDto = Readonly<{

	/**
	 * Start date in ISO format.
	 * @example 2024-07-28T04:43:27.035Z
	 */
	start: string | null;

	/**
	 * End date in ISO format.
	 * @example 2024-07-28T04:43:27.035Z
	 */
	end: string | null;
}>;
