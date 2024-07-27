/** Date range. */
export type DateRange = Readonly<{

	/** Start date. */
	startAt: Date;

	/** End date. */
	endAt: Date;
}>;

/** Date Range DTO. */
export type DateRangeDto = Readonly<{

	/** Start date in ISO format. */
	start: string;

	/** End date in ISO format. */
	end: string;
}>;
