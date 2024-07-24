import { Immerable, OmitImmerable } from './immerable';

/** Pagination Blue Print. */
export class PaginationBluePrint<T> extends Immerable {

	/** Total number of results. */
	public readonly count: number;

	/** The link of the next page. */
	public readonly next: string | null;

	/** The link of the previous page. */
	public readonly previous: string | null;

	/** A list of results. */
	public readonly results: readonly T[];

	public constructor(data: Pagination<T>) {
		super();

		this.count = data.count;
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}

/** Pagination Type. */
export type Pagination<T> = OmitImmerable<PaginationBluePrint<T>>;
