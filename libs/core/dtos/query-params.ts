import { Immerable, OmitImmerable } from '../models/immerable';

import { AnimeTypeDto } from './anime';

/** Query Params Blue Print DTO. */
export class QueryParamsDtoBluePrint extends Immerable {
	/** The initial index from which to return the results. */
	public readonly offset: number | null;

	/** Number of results to return per page. */
	public readonly limit: number | null;

	/** Sort fields. */
	public readonly ordering: string[] | null;

	/** Filter type. */
	public readonly type: AnimeTypeDto | null;

	/** Search query. */
	public readonly search: string | null;

	public constructor(data: QueryParamsDto) {
		super();

		this.offset = data.offset;
		this.limit = data.limit;
		this.ordering = data.ordering;
		this.type = data.type;
		this.search = data.search;
	}
}

/** Query params DTO. */
export type QueryParamsDto = OmitImmerable<QueryParamsDtoBluePrint>;
