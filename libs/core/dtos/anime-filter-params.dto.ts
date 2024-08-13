import { BaseFilterParamsDto } from './base-filter-params.dto';

/** Anime filter params DTO. */
export namespace AnimeFilterParamsDto {

	/** Sort. */
	export type Sort = Readonly<{

		/** Sort fields. */
		ordering: string | null;
	}>;

	/** Filter. */
	export type Filter = Readonly<{

		/** Filter type. */
		type__in: string | null;
	}>;

	/** Anime query params. */
	export type Combined = Sort & Filter & BaseFilterParamsDto.Combined;
}
