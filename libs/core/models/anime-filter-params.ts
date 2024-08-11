import { SortDirection } from './sort-direction';
import { AnimeType } from './anime';
import { SortFields } from './sort-fields';
import { BaseFilterParams } from './base-filter-params';

/** Anime filter params domain model. */
export namespace AnimeFilterParams {

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
	export type Combined = Sort & Filter & BaseFilterParams.Combined;
}
