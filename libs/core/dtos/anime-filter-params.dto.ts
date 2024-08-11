import { AnimeTypeDto } from './anime.dto';
import { BaseFilterParamsDto } from './base-filter-params.dto';

/** Anime filter params DTO. */
export namespace AnimeFilterParamsDto {

	/** Sort. */
	export type Sort = {

		/** Sort fields. */
		ordering: string | null;
	};

	/** Filter. */
	export type Filter = {

		/** Filter type. */
		type: AnimeTypeDto | null;
	};

	/** Anime query params. */
	export type Combined = Sort & Filter & BaseFilterParamsDto.Combined;
}
