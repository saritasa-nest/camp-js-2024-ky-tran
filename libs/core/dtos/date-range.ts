/** Date range DTO. */
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
