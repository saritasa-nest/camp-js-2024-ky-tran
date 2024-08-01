import { Filter, Paginator, Search, Sort } from '../models/query-params';

/** Update Url params options. */
export type UpdateUrlParamsOptions = Readonly<{

	/** Paginator option. */
	paginator: Paginator | null;

	/** Sort option. */
	sort: Sort | null;

	/** Filter option. */
	filter: Filter | null;

	/** Search option. */
	search: Search | null;
}>;
