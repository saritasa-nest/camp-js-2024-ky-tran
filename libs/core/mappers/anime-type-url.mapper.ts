import { AnimeType } from '../models/anime';
import { AnimeTypeQueryParamsDto } from '../dtos/anime-type-query-params.dto';

/** Mapping from DTO to domain model. */
export const TYPE_URL_MAPPING_FROM_DTO: Readonly<Record<AnimeTypeQueryParamsDto, AnimeType>> = {
	[AnimeTypeQueryParamsDto.Tv]: AnimeType.Tv,
	[AnimeTypeQueryParamsDto.Ova]: AnimeType.Ova,
	[AnimeTypeQueryParamsDto.Movie]: AnimeType.Movie,
	[AnimeTypeQueryParamsDto.Special]: AnimeType.Special,
	[AnimeTypeQueryParamsDto.Ona]: AnimeType.Ona,
	[AnimeTypeQueryParamsDto.Music]: AnimeType.Music,
	[AnimeTypeQueryParamsDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeQueryParamsDto.Unknown]: AnimeType.Unknown,
};

/** Mapping from Domain model to DTO. */
export const TYPE_URL_MAPPING_TO_DTO: Readonly<Record<AnimeType, AnimeTypeQueryParamsDto>> = {
	[AnimeType.Tv]: AnimeTypeQueryParamsDto.Tv,
	[AnimeType.Ova]: AnimeTypeQueryParamsDto.Ova,
	[AnimeType.Movie]: AnimeTypeQueryParamsDto.Movie,
	[AnimeType.Special]: AnimeTypeQueryParamsDto.Special,
	[AnimeType.Ona]: AnimeTypeQueryParamsDto.Ona,
	[AnimeType.Music]: AnimeTypeQueryParamsDto.Music,
	[AnimeType.PromotionalVideos]: AnimeTypeQueryParamsDto.PromotionalVideos,
	[AnimeType.Unknown]: AnimeTypeQueryParamsDto.Unknown,
};

/** Anime type url mapper. */
export namespace AnimeTypeUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param typeDto DTO.
	 */
	export function fromDto(typeDto: AnimeTypeQueryParamsDto): AnimeType {
		return TYPE_URL_MAPPING_FROM_DTO[typeDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param typeModel Domain model.
	 */
	export function toDto(typeModel: AnimeType): AnimeTypeQueryParamsDto {
		return TYPE_URL_MAPPING_TO_DTO[typeModel];
	}
}
