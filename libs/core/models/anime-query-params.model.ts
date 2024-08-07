import { SortDirection } from './sort-direction.model';
import { AnimeType } from './anime.model';
import { SortFields } from './sort-fields.model';
import { BaseQueryParams } from './base-query-params.model';

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
