import { SortDirectionQueryParams } from '../enums/sort-direction-query-params';
import { SortFieldsQueryParams } from '../enums/sort-fields-query-params';
import { BaseQueryParams } from '../namespaces/base-query-params';

/** Anime query params. */
export namespace AnimeQueryParams {

	/** Sort. */
	export type Sort = {

		/** Sort field. */
		sortField: SortFieldsQueryParams | null;

		/** Sort direction. */
		sortDirection: SortDirectionQueryParams | null;
	};

	/** Filter. */
	export type Filter = {

		/** Filter type. */
		typeIn: string | null;
	};

	/** Anime query params. */
	export type Combined = Sort & Filter & BaseQueryParams.Combined;
}
