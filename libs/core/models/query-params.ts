import { AnimeType } from './anime';
import { Immerable, OmitImmerable } from './immerable';

/** Query Params Blue Print. */
export class QueryParamsBluePrint extends Immerable {
	/** Page number. */
	public readonly pageNumber: number | null;

	/** Page size. */
	public readonly pageSize: number | null;

	/** Sort fields. */
	public readonly sortFields: string[] | null;

	/** Filter type. */
	public readonly type: AnimeType | null;

	/** Search query. */
	public readonly search: string | null;

	public constructor(data: QueryParams) {
		super();

		this.pageNumber = data.pageNumber;
		this.pageSize = data.pageSize;
		this.sortFields = data.sortFields;
		this.type = data.type;
		this.search = data.search;
	}
}

/** Query params. */
export type QueryParams = OmitImmerable<QueryParamsBluePrint>;
