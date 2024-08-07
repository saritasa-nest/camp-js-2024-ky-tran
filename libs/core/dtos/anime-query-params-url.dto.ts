import { AnimeTypeUrlDto } from './anime-type-url.dto';
import { BaseQueryParamsUrlDto } from './base-query-params-url.dto';
import { SortDirectionUrlDto } from './sort-direction-url.dto';
import { SortFieldsUrlDto } from './sort-fields-url.dto';

/** Anime query params URL DTO. */
export namespace AnimeQueryParamsUrlDto {

	/** Sort. */
	export type Sort = {

		/** Sort field. */
		sortField: SortFieldsUrlDto | null;

		/** Sort direction. */
		sortDirection: SortDirectionUrlDto | null;
	};

	/** Filter. */
	export type Filter = {

		/** Filter type. */
		type: AnimeTypeUrlDto | null;
	};

	/** Anime query params. */
	export type Combined = Sort & Filter & BaseQueryParamsUrlDto.Combined;
}
