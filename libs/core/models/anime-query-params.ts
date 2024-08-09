import { SortDirection } from './sort-direction';
import { AnimeType } from './anime';
import { SortFields } from './sort-fields';
import { BaseQueryParams } from './base-query-params';

// TODO (Ky Tran): Update name
/** Anime query params domain model. */
export namespace AnimeQueryParams {

	/** Sort. */
	export type Sort = {

		/** Sort field. */
		sortField: SortFields | null;

		/** Sort direction. */
		sortDirection: SortDirection | null;
	};

	/** Filter. */
	export type Filter = {

		/** Filter type. */
		type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = Sort & Filter & BaseQueryParams.Combined;
}
