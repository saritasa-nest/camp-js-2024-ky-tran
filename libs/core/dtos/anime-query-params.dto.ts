import { BaseQueryParamsDto } from './base-query-params.dto';
import { SortDirectionQueryParamsDto } from './sort-direction-query-params.dto';
import { SortFieldsQueryParamsDto } from './sort-fields-query-params.dto';

/** Anime query params DTO. */
export namespace AnimeQueryParamsDto {

	/** Sort. */
	export type Sort = {

		/** Sort field. */
		sortField: SortFieldsQueryParamsDto | null;

		/** Sort direction. */
		sortDirection: SortDirectionQueryParamsDto | null;
	};

	/** Filter. */
	export type Filter = {

		/** Filter type. */
		typeIn: string | null;
	};

	/** Anime query params. */
	export type Combined = Sort & Filter & BaseQueryParamsDto.Combined;
}
