import { AnimeType } from '../models/anime-type';

/** Anime type query params. */
export enum AnimeTypeQueryParams {
	Tv = 'tv',
	Ova = 'ova',
	Movie = 'movie',
	Special = 'special',
	Ona = 'ona',
	Music = 'music',
	PromotionalVideos = 'promotional videos',
	Unknown = 'unknown',
}

/** Mapping from query params to domain model. */
const TYPE_QUERY_PARAMS_MAPPING_FROM_DTO: Readonly<Record<AnimeTypeQueryParams, AnimeType>> = {
	[AnimeTypeQueryParams.Tv]: AnimeType.Tv,
	[AnimeTypeQueryParams.Ova]: AnimeType.Ova,
	[AnimeTypeQueryParams.Movie]: AnimeType.Movie,
	[AnimeTypeQueryParams.Special]: AnimeType.Special,
	[AnimeTypeQueryParams.Ona]: AnimeType.Ona,
	[AnimeTypeQueryParams.Music]: AnimeType.Music,
	[AnimeTypeQueryParams.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeQueryParams.Unknown]: AnimeType.Unknown,
};

/** Mapping from domain model to query params. */
const TYPE_QUERY_PARAMS_MAPPING_TO_DTO: Readonly<Record<AnimeType, AnimeTypeQueryParams>> = {
	[AnimeType.Tv]: AnimeTypeQueryParams.Tv,
	[AnimeType.Ova]: AnimeTypeQueryParams.Ova,
	[AnimeType.Movie]: AnimeTypeQueryParams.Movie,
	[AnimeType.Special]: AnimeTypeQueryParams.Special,
	[AnimeType.Ona]: AnimeTypeQueryParams.Ona,
	[AnimeType.Music]: AnimeTypeQueryParams.Music,
	[AnimeType.PromotionalVideos]: AnimeTypeQueryParams.PromotionalVideos,
	[AnimeType.Unknown]: AnimeTypeQueryParams.Unknown,
};

/** Anime type query params mapper. */
export namespace AnimeTypeQueryParamsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param typeDto DTO.
	 */
	export function fromDto(typeDto: AnimeTypeQueryParams): AnimeType {
		return TYPE_QUERY_PARAMS_MAPPING_FROM_DTO[typeDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param typeModel Domain model.
	 */
	export function toDto(typeModel: AnimeType): AnimeTypeQueryParams {
		return TYPE_QUERY_PARAMS_MAPPING_TO_DTO[typeModel];
	}
}
