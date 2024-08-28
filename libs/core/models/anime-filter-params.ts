import { SortDirection } from './sort-direction';
import { SortFields } from './sort-fields';
import { BaseFilterParams } from './base-filter-params';
import { AnimeType } from './anime-type';

/** Anime filter params domain model. */
export namespace AnimeFilterParams {

	/** Sort. */
	export type Sort = Readonly<{

		/** Sort field. */
		sortField: SortFields | null;

		/** Sort direction. */
		sortDirection: SortDirection | null;
	}>;

	/** Filter. */
	export type Filter = Readonly<{

		/** Filter type. */
		typeIn: readonly AnimeType[] | null;
	}>;

	/** Anime query params. */
	export type Combined = Sort & Filter & BaseFilterParams.Combined;
}
