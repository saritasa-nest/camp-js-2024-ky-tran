import { AnimeTypeDto } from './anime.dto';
import { BaseQueryParamsDto } from './base-query-params.dto';

/** Anime query params DTO. */
export namespace AnimeQueryParamsDto {

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
	export type Combined = Sort & Filter & BaseQueryParamsDto.Combined;
}
